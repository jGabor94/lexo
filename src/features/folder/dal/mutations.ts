"use server"

import { db } from "@/drizzle/db"
import { setToFolderTable } from "@/drizzle/schema"
import { Dal } from "@/lib/dal"
import { createSuccessReturn } from "@/lib/dal/types"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import z from "zod"
import { foldersTable } from "../drizzle/schema"
import { FolderInput } from "../types"

export const createFolder = Dal.create()
    .$Input<[name: string]>()
    .schema({
        input: z.tuple([z.string()]),
    })
    .authenticate()
    .authorize({
        resource: "folder",
        action: "create",
    })
    .operation(async ({ input, user }) => {
        const [name] = input
        const [res] = await db.insert(foldersTable).values({ name, userid: user.id }).returning()
        return createSuccessReturn({ createdFolderId: res.id })
    })

export const deleteFolder = Dal.create()
    .$Input<[folderid: string]>()
    .schema({
        input: z.tuple([z.string()]),
    })
    .authenticate()
    .authorize({
        resource: "folder",
        action: "delete",
        data: async (folderid) => db.query.foldersTable.findFirst({ where: { id: folderid } })
    })
    .operation(async ({ input }) => {
        const [folderid] = input
        await db.delete(foldersTable).where(eq(foldersTable.id, folderid))

    })

export const removeFromFolder = Dal.create()
    .$Input<[folderid: string, setid: string]>()
    .schema({
        input: z.tuple([z.string(), z.string()]),
    })
    .authenticate()
    .authorize({
        resource: "folder",
        action: "update",
        data: async (folderid) => db.query.foldersTable.findFirst({ where: { id: folderid } })
    })
    .operation(async ({ input }) => {
        const [folderid, setid] = input
        await db.delete(setToFolderTable).where(and(eq(setToFolderTable.folderid, folderid), eq(setToFolderTable.setid, setid)))
        revalidatePath(`/folders/${folderid}`, "page")
    })

export const updateFolder = Dal.create()
    .$Input<[folderid: string, data: FolderInput]>()
    .schema({
        input: z.tuple([z.string(), z.object({ name: z.string() })]),
    })
    .authenticate()
    .authorize({
        resource: "folder",
        action: "update",
        data: async (folderid) => db.query.foldersTable.findFirst({ where: { id: folderid } })
    })
    .operation(async ({ input }) => {
        const [folderid, data] = input
        await db.update(foldersTable).set(data).where(eq(foldersTable.id, folderid))
    })