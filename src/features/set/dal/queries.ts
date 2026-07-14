"server only"

import { db } from "@/drizzle/db"
import { Dal } from "@/lib/dal"
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types"
import z from "zod"
import { getFavoritesQuery, getLikersQuery, getSetQuery, getSetsQuery } from "../drizzle/operations"


export const getSet = Dal.create()
    .$Input<[setid: string, taskid?: string | undefined]>()
    .schema({
        input: z.tuple([z.uuidv4(), z.uuidv4().optional()]),
    })
    .authenticate()
    .authorize({
        resource: "set",
        action: "read",
        data: async (setid, taskid) => db.query.setsTable.findFirst({
            where: { id: setid }, ...taskid && {
                with: {
                    tasks: {
                        where: { id: taskid },
                        with: {
                            class: {
                                with: {
                                    students: true
                                }
                            }
                        }
                    }
                }
            }
        })
    })
    .operation(async ({ input, user }) => {
        const [setid, taskid] = input

        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

        if (!UUID_REGEX.test(setid)) {
            return createErrorReturn({ type: "invalid-uuid" })
        }
        const res = await getSetQuery(setid, user.id, taskid)
        if (!res) return createErrorReturn({ type: "not-found" })

        return createSuccessReturn(res)
    })

export const getOwnSets = Dal.create()
    .$Input<[query?: Parameters<typeof db.query.setsTable.findMany>[0]]>()
    .authenticate()
    .operation(async ({ user, input }) => {
        const [query] = input
        return createSuccessReturn(await getSetsQuery({ ...query, where: { ...query?.where, userid: user.id } }))
    })

export const getSets = Dal.create()
    .$Input<[query?: Parameters<typeof db.query.setsTable.findMany>[0]]>()
    .authenticate()
    .operation(async ({ input }) => createSuccessReturn(await getSetsQuery(input[0])))


export const getLikers = Dal.create()
    .$Input<[setid: string, taskid?: string | undefined]>()
    .schema({
        input: z.tuple([z.uuidv4(), z.uuidv4().optional()]),
        output: z.object({
            count: z.number(),
            isLiked: z.boolean()
        })
    })
    .authenticate()
    .authorize({
        resource: "set",
        action: "read",
        data: async (setid, taskid) => db.query.setsTable.findFirst({
            where: { id: setid }, with: {
                tasks: {
                    where: { id: taskid },
                    with: {
                        class: {
                            with: {
                                students: true
                            }
                        }
                    }
                }
            }
        })
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
    .$Input<[query?: Parameters<typeof db.query.setsTable.findMany>[0]]>()
    .authenticate()
    .operation(async ({ user, input }) => {
        const [query] = input
        const res = await getFavoritesQuery(user.id)
        if (!res) return createErrorReturn({ type: "not-found" })
        return createSuccessReturn(res)
    })








