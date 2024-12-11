"use server"

import { db } from "@/drizzle/db"
import { foldersTable, setToFolderTable } from "@/drizzle/schema"
import { desc, eq, sql } from "drizzle-orm"

export default async (userid: string) => {

    const folders = await db.query.foldersTable.findMany({
        where: eq(foldersTable.userid, userid),
        columns: {
            userid: false,
        },
        with: {
            sets: {
                with: {
                    set: {
                        columns: {
                            id: true
                        }
                    }
                }
            }
        },
        extras: {
            setsCount: sql<number>`(SELECT COUNT(*) FROM ${setToFolderTable} AS t WHERE t.folderid = ${foldersTable.id})`.as('setsCount')
        },
        orderBy: desc(foldersTable.createdAt)

    })

    return folders.map(folder => ({
        ...folder, sets: folder.sets.map(junctionRow => junctionRow.set.id)
    }))

}
