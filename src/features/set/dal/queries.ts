"use server"

import { db } from "@/drizzle/db"
import { Dal } from "@/lib/dal"
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types"
import z from "zod"
import { getFavoritesQuery, getLikersQuery, getSetQuery, getSetsQuery } from "../drizzle/operations"


export const getSet = Dal.create()
    .$Input<[setid: string]>()
    .schema({
        input: z.tuple([z.string()]),
    })
    .authenticate()
    .authorize({
        resource: "set",
        action: "read",
        data: async (setid) => db.query.setsTable.findFirst({ where: { id: setid } })
    })
    .operation(async ({ input }) => {
        const [setid] = input

        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

        if (!UUID_REGEX.test(setid)) {
            return createErrorReturn({ type: "invalid-uuid" })
        }

        const res = await getSetQuery(setid)

        if (!res) return createErrorReturn({ type: "not-found" })

        return createSuccessReturn(res)
    })


export const getOwnSets = Dal.create()
    .authenticate()
    .operation(async ({ user }) => createSuccessReturn(await getSetsQuery(user.id)))


export const getLikers = Dal.create()
    .$Input<[setid: string]>()
    .schema({
        input: z.tuple([z.string()]),
        output: z.object({
            count: z.number(),
            isLiked: z.boolean()
        })
    })
    .authenticate()
    .authorize({
        resource: "set",
        action: "read",
        data: async (setid) => db.query.setsTable.findFirst({ where: { id: setid } })
    })
    .operation(async ({ input, user }) => {

        const [setid] = input

        const res = await getLikersQuery(setid)

        if (!res) return createErrorReturn({ type: "not-found" })

        return createSuccessReturn({
            count: res.length,
            isLiked: res.some(f => f.id === user.id),
        })

    })


export const getFavorites = Dal.create()
    .authenticate()
    .operation(async ({ user }) => {
        const res = await getFavoritesQuery(user.id)
        if (!res) return createErrorReturn({ type: "not-found" })
        return createSuccessReturn(res)
    })








