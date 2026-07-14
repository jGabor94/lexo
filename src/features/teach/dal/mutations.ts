"use server"

import { db } from "@/drizzle/db"
import { classesTable, classToStudentsTable, classToTeachersTable, invitesTable, setToTaskTable, tasksTable } from "@/drizzle/schema"
import InviteStudent from "@/features/email/lib/templates/InviteStudent"
import { getSetsQuery } from "@/features/set/drizzle/operations"
import { HOST } from "@/lib/contants"
import { Dal } from "@/lib/dal"
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types"
import { and, eq } from "drizzle-orm"
import { nanoid } from "nanoid"
import { revalidatePath } from "next/cache"
import { Resend } from 'resend'
import z from "zod"
import { getClassQuery, getInviteQuery } from "../drizzle/operations"
import { ClassInputs, TaskInputs } from "../types"
import { classFormSchema, taskFormSchema } from "../zod/schema"

export const createClass = Dal.create()
    .$Input<[data: ClassInputs]>()
    .schema({
        input: z.tuple([classFormSchema]),
        output: z.object({ id: z.string() })
    })
    .authenticate()
    .authorize({
        resource: "class",
        action: "create",
    })
    .operation(async ({ input: [data], user }) => {

        const res = await db.transaction(async (tx) => {
            const res = (await tx.insert(classesTable).values(data).returning({ id: classesTable.id }))[0]
            await tx.insert(classToTeachersTable).values({
                teacherId: user.id,
                classId: res.id
            })
            return res
        })

        return createSuccessReturn(res)
    })

export const inviteToClass = Dal.create()
    .$Input<[classId: string, emails: string[], type: "student" | "teacher"]>()
    .schema({
        input: z.tuple([z.uuidv4(), z.array(z.email()), z.enum(["student", "teacher"])]),
    })
    .authenticate()
    .authorize({
        resource: "class",
        action: "invite",
        data: async (id) => db.query.classesTable.findFirst({ where: { id }, with: { teachers: true, students: true } })
    })
    .operation(async ({ input: [classId, emails, type], user }) => {
        const classData = await getClassQuery(classId)
        if (!classData) return createErrorReturn({ type: "not_found" })

        const filteredEmails = emails.filter(email => ![...classData.students, ...classData.teachers].some(i => i.email === email))

        if (filteredEmails.length > 0) {
            const [{ inviteId }] = await db.insert(invitesTable).values(filteredEmails.map(email => ({
                classId,
                teacherId: user.id,
                email,
                type,
                inviteId: nanoid()
            }))).returning({ inviteId: invitesTable.inviteId })


            const resend = new Resend(process.env.RESEND_API_KEY);
            const { data, error } = await resend.emails.send({
                from: 'Lexo <lexo@hobbycode.link>',
                to: filteredEmails,
                subject: `${type === "student" ? "Tanulói" : "Tanári"} meghívás a ${classData?.name} osztályba!`,
                react: InviteStudent({
                    className: classData.name,
                    inviteUrl: `${HOST}/action/invite/accept/${inviteId}`,
                    teacherName: user.name,
                    classCode: "XXXXXXX",
                    type
                }),
            });

            if (error) {
                return createErrorReturn({ type: "email_send_error" })
            }
        }
    })

export const createTask = Dal.create({ cache: false })
    .$Input<[classId: string, data: TaskInputs]>()
    .schema({
        input: z.tuple([z.uuidv4(), taskFormSchema]),
        output: z.object({ id: z.uuidv4() })
    })
    .authenticate()
    .authorize({
        resource: "class",
        action: "assign",
        data: async (id) => db.query.classesTable.findFirst({ where: { id }, with: { teachers: true, students: true } })
    })
    .operation(async ({ input: [classId, data], user }) => {
        const deadline = new Date(data.deadline)
        if (Number.isNaN(deadline.getTime())) {
            return createErrorReturn({ type: "invalid-deadline" })
        }

        const ownedSets = await getSetsQuery({
            where: {
                id: { in: data.setIds },
                userid: user.id
            },
        })

        if (ownedSets.length !== data.setIds.length) {
            return createErrorReturn({ type: "set-not-found" })
        }

        const task = await db.transaction(async (tx) => {
            const [task] = await tx.insert(tasksTable).values({
                classId,
                name: data.name,
                description: data.description,
                deadline,
            }).returning({ id: tasksTable.id })

            await tx.insert(setToTaskTable).values(data.setIds.map((setId) => ({
                setId,
                taskId: task.id
            })))

            return task
        })

        revalidatePath(`/class/${classId}`)
        return createSuccessReturn(task)
    })

export const acceptInvite = Dal.create()
    .$Input<[inviteid: string]>()
    .schema({
        input: z.tuple([z.nanoid()]),
    })
    .authenticate()
    .operation(async ({ input: [inviteid], user }) => {
        const inviteData = await getInviteQuery(inviteid)
        if (!inviteData) return createErrorReturn({ type: "not_found" })
        if (inviteData.email !== user.email) return createErrorReturn({ type: "email-mismatch" })

        const res = await db.transaction(async (tx) => {
            let res
            if (inviteData.type === "teacher") {
                res = (await tx.insert(classToTeachersTable).values({
                    classId: inviteData.classId,
                    teacherId: user.id,
                }).returning({ classId: classToTeachersTable.classId }))[0]
            } else {
                res = (await tx.insert(classToStudentsTable).values({
                    classId: inviteData.classId,
                    studentId: user.id,
                }).returning({ classId: classToStudentsTable.classId }))[0]

            }

            await tx.delete(invitesTable).where(and(eq(invitesTable.classId, inviteData.classId), eq(invitesTable.email, inviteData.email)))
            return res

        })

        return createSuccessReturn(res)

    })
