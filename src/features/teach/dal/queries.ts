"server only"

import { db } from "@/drizzle/db"
import { Dal } from "@/lib/dal"
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types"
import z from "zod"
import { getClassQuery, getOwnClassesQuery } from "../drizzle/operations"

export const getOwnClasses = Dal.create()
    .authenticate()
    .operation(async ({ user }) => {
        const res = await getOwnClassesQuery(user.id)
        if (!res) return createErrorReturn({ type: "not-found" })
        return createSuccessReturn(res)
    })

export const getClass = Dal.create()
    .$Input<[classid: string]>()
    .schema({
        input: z.tuple([z.string()]),
    })
    .authenticate()
    .authorize({
        resource: "class",
        action: "read",
        data: async (id) => db.query.classesTable.findFirst({ where: { id }, with: { teachers: true } })
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