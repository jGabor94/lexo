"use server"

import { db } from "@/drizzle/db"
import { classesTable, classToUsersTable } from "@/drizzle/schema"
import { Dal } from "@/lib/dal"
import { createSuccessReturn } from "@/lib/dal/types"
import z from "zod"
import { ClassInputs } from "../types"
import { classFormSchema } from "../zod/schema"

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
            await tx.insert(classToUsersTable).values({
                teacherId: user.id,
                classId: res.id
            })
            return res
        })

        return createSuccessReturn(res)
    })
