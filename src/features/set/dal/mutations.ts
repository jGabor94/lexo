"use server"

import { db } from "@/drizzle/db"
import { termsTable } from "@/drizzle/schema"
import { Dal } from "@/lib/dal"
import { createErrorReturn, createSuccessReturn, ParamsType } from "@/lib/dal/types"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import z from "zod"
import { getSetQuery } from "../drizzle/operations"
import { favoriteSetsTable, setsTable, setToFolderTable } from "../drizzle/schema"
import { SetInput } from "../types"
import { setFormSchema } from "../zod/schema"



export const switchLike = Dal.create()
    .$Input<[setid: string, isLiked: boolean]>()
    .schema({
        input: z.tuple([z.string(), z.boolean()]),
    })
    .authenticate()
    .operation(async ({ input, user }) => {
        const [setid, isLiked] = input
        if (isLiked) {
            await db.insert(favoriteSetsTable).values({ userid: user.id, setid })
        } else {
            await db.delete(favoriteSetsTable).where(and(eq(favoriteSetsTable.userid, user.id), eq(favoriteSetsTable.setid, setid)))
        }
    })



export const addToFolder = Dal.create()
    .$Input<[folderid: string, setid: string]>()
    .schema({
        input: z.tuple([z.string(), z.string()]) as ParamsType<[folderid: z.ZodString, setid: z.ZodString]>,
    })
    .authenticate()
    .authorize({
        resource: "folder",
        action: "update",
        data: async (folderid) => db.query.foldersTable.findFirst({ where: { id: folderid } })
    })
    .operation(async ({ input }) => {
        const [folderid, setid] = input
        await db.insert(setToFolderTable).values({ folderid, setid })
        revalidatePath(`/folders/${folderid}`, "page")
    })



export const createCopy = Dal.create()
    .$Input<[setid: string]>()
    .schema({
        input: z.tuple([z.string()]),
        output: z.object({
            newSetId: z.string()
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

        const set = await getSetQuery(setid)

        if (!set) return createErrorReturn({ type: "not-found" })

        return db.transaction(async (tx) => {
            const [{ id: insertedSetId }] = await tx.insert(setsTable).values({
                name: `${set.name} - Másolat`,
                preferredTermLang: set.preferredTermLang,
                preferredDefinitionLang: set.preferredDefinitionLang,
                userid: user.id,
            }).returning({ id: setsTable.id })


            await tx.insert(termsTable).values(set.terms.map((term) => ({
                term: term.term,
                definition: term.definition,
                setid: insertedSetId,
                status: 0,
            })))

            return createSuccessReturn({ newSetId: insertedSetId })
        })
    })

export const createSet = Dal.create()
    .$Input<[data: SetInput, folderid?: string]>()
    .schema({
        input: z.tuple([setFormSchema, z.string().optional()]),
        output: z.object({ id: z.string() })
    })
    .authenticate()
    .authorize({
        resource: "set",
        action: "create",
    })
    .operation(async ({ input, user }) => {
        const [data, folderid] = input

        const insertData = {
            ...data,
            folderid,
            userid: user.id,
        }

        const res = (await db.insert(setsTable).values(insertData).returning({ id: setsTable.id }))[0]
        revalidatePath(`/folders/${folderid}`, "page")

        return createSuccessReturn(res)
    })


export const deleteSet = Dal.create()
    .$Input<[setid: string]>()
    .schema({
        input: z.tuple([z.string()]),
    })
    .authenticate()
    .authorize({
        resource: "set",
        action: "delete",
        data: async (setid) => db.query.setsTable.findFirst({ where: { id: setid } })
    })
    .operation(async ({ input }) => {
        const [setid] = input
        await db.delete(setsTable).where(eq(setsTable.id, setid))
    })




export const updateSet = Dal.create()
    .$Input<[setid: string, data: SetInput]>()
    .schema({
        input: z.tuple([z.string(), setFormSchema]),
    })
    .authenticate()
    .authorize({
        resource: "set",
        action: "update",
        data: async (setid) => db.query.setsTable.findFirst({ where: { id: setid } })
    })
    .operation(async ({ input }) => {
        const [setid, data] = input
        await db.update(setsTable).set(data).where(eq(setsTable.id, setid))
    })








