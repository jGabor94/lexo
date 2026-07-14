"server only"

import { db } from "@/drizzle/db"
import { Dal } from "@/lib/dal"
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types"
import z from "zod"
import { getAttendedClassesQuery, getClassQuery, getInviteQuery, getSupervisedClassesQuery } from "../drizzle/operations"
import { calcClassOwnStats, calcClassStats, isDueThisWeek } from "../lib/utils"

export const getTeacherOverview = Dal.create()
    .authenticate()
    .operation(async ({ user }) => {
        const classes = await getSupervisedClassesQuery(user.id)
        if (!classes) return createErrorReturn({ type: "not-found" })

        const calculatedClasses = classes.map((classData) => calcClassStats(classData))

        const allAssignments = calculatedClasses.flatMap((classData) => classData.assigments.map((task) => ({ ...task, className: classData.name })))
        const activeAssignmentsNumber = allAssignments.reduce((sum, assignment) => {
            return sum + (!assignment.isExpired && !assignment.stats.average.isCompleted ? 1 : 0)
        }, 0)

        const nextAssignment = allAssignments.find((assignment) => new Date(assignment.deadline).getTime() >= Date.now())
        const completedScores = allAssignments.reduce((sum, assignment) => sum + assignment.stats.average.completedScores, 0)
        const totalScores = allAssignments.reduce((sum, assignment) => sum + assignment.stats.average.totalScores, 0)
        const dueThisWeekNumber = allAssignments.filter((assignment) => !assignment.isExpired && isDueThisWeek(assignment.deadline)).length

        return createSuccessReturn({
            classes: calculatedClasses,
            activeAssignmentsNumber,
            activeClasses: calculatedClasses.reduce((sum, calculatedClass) => sum + (calculatedClass.isActive ? 1 : 0), 0),
            nextAssignment,
            progress: totalScores > 0 ? Math.round((completedScores / totalScores) * 100) : 0,
            dueThisWeekNumber
        })
    })

export const getStudentOverview = Dal.create()
    .authenticate()
    .operation(async ({ user }) => {
        const classes = await getAttendedClassesQuery(user.id)
        if (!classes) return createErrorReturn({ type: "not-found" })

        const calculatedClasses = classes.map((classData) => calcClassOwnStats(classData, user.id))

        const allAssignments = calculatedClasses.flatMap((item) => item.tasks.map((task) => ({ ...task, className: item.name })))
        const activeAssignmentsNumber = allAssignments.reduce((sum, assignment) => {
            return sum + (!assignment.isExpired && !assignment.stats.isCompleted ? 1 : 0)
        }, 0)

        const nextAssignment = allAssignments.find((assignment) => new Date(assignment.deadline).getTime() >= Date.now())
        const completedScores = allAssignments.reduce((sum, assignment) => sum + assignment.stats.completedScores, 0)
        const totalScores = allAssignments.reduce((sum, assignment) => sum + assignment.stats.totalScores, 0)

        return createSuccessReturn({
            classes: calculatedClasses,
            activeAssignmentsNumber,
            nextAssignment,
            progress: totalScores > 0 ? Math.round((completedScores / totalScores) * 100) : 0
        })
    })

export const getInvite = Dal.create()
    .$Input<[inviteId: string]>()
    .schema({
        input: z.tuple([z.nanoid()]),
    })
    .operation(async ({ input: [inviteId] }) => {
        const invite = await getInviteQuery(inviteId)
        if (!invite) return createErrorReturn({ type: "not-found" })
        return createSuccessReturn(invite)
    })

export const getStudentClassOverview = Dal.create()
    .$Input<[classid: string]>()
    .schema({
        input: z.tuple([z.string()]),
    })
    .authenticate()
    .authorize({
        resource: "class",
        action: "read",
        data: async (id) => db.query.classesTable.findFirst({ where: { id }, with: { teachers: true, students: true } })
    })
    .operation(async ({ input, user }) => {
        const [classid] = input

        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

        if (!UUID_REGEX.test(classid)) {
            return createErrorReturn({ type: "invalid-uuid" })
        }

        const classData = await getClassQuery(classid)

        if (!classData) return createErrorReturn({ type: "not-found" })

        const calculatedClass = calcClassOwnStats(classData, user.id)

        return createSuccessReturn(calculatedClass)
    })

export const getTask = Dal.create()
    .$Input<[taskid: string]>()
    .schema({
        input: z.tuple([z.string()]),
    })
    .authenticate()
    .authorize({
        resource: "class",
        action: "read",
        data: async (id) => db.query.classesTable.findFirst({ where: { id }, with: { teachers: true, students: true } })
    })
    .operation(async ({ input }) => {
        const [classid] = input

        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

        if (!UUID_REGEX.test(classid)) {
            return createErrorReturn({ type: "invalid-uuid" })
        }

        const res = await getClassQuery(classid)

        if (!res) return createErrorReturn({ type: "not-found" })

        return createSuccessReturn(res)
    })

