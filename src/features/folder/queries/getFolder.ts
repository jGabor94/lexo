"use server"

import { db } from "@/drizzle/db"
import { foldersTable, setsTable, termsTable } from "@/drizzle/schema"
import { eq, sql } from "drizzle-orm"

export default async (folderid: string) => {

    /*
        const res = await db.select().from(setToFolderTable)
            .where(sql`${foldersTable.id} IN (SELECT setid FROM ${setToFolderTable} WHERE ${setToFolderTable.userid} = ${userid})`)
    */
    const folder = await db.query.foldersTable.findFirst({
        where: eq(foldersTable.id, folderid),
        with: {
            sets: {
                with: {
                    set: {
                        with: {
                            user: {
                                columns: {
                                    name: true,
                                    image: true
                                }
                            }
                        },
                        columns: {
                            userid: false,
                        },
                        extras: {
                            termsCount: sql<number>`(SELECT COUNT(*) FROM ${termsTable} AS t WHERE t.setid = ${setsTable.id})`.as('termsCount')
                        }
                    }

                }

            }
        },
        columns: {
            userid: false
        }
    })


    return folder && { ...folder, sets: folder.sets.map(junctionRow => junctionRow.set) }
}

