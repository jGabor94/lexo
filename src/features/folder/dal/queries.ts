"server only"

import { db } from "@/drizzle/db"
import { Dal } from "@/lib/dal"
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types"
import z from "zod"
import { getFolderQuery, getFoldersQuery } from "../drizzle/operations"


export const getOwnFolders = Dal.create()
    .authenticate()
    .operation(async ({ user }) => createSuccessReturn(await getFoldersQuery(user.id)))

export const getFolder = Dal.create()
    .$Input<[folderid: string]>()
    .schema({ input: z.tuple([z.string()]) })
    .authenticate()
    .authorize({
        resource: "folder",
        action: "read",
        data: async (folderid) => db.query.foldersTable.findFirst({ where: { id: folderid } })
    })
    .operation(async ({ input }) => {
        const [folderid] = input
        const folder = await getFolderQuery(folderid)
        if (!folder) return createErrorReturn({ type: "not-found" })
        return createSuccessReturn(folder)
    })
