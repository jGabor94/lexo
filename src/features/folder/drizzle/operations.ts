import { db } from "@/drizzle/db"
import { termsTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { cache } from "react"

export const getFolderQuery = cache(async (folderid: string) => db.query.foldersTable.findFirst({
    where: {
        id: folderid
    },
    with: {
        sets: {
            with: {
                user: {
                    columns: {
                        name: true,
                        image: true
                    }
                }
            },
            extras: {
                termsCount: (table) => db.$count(termsTable, eq(table.id, termsTable.setid))
            }
        }
    },
    columns: {
        userid: false
    }
})
)


export const getFoldersQuery = cache(async (userid: string) => {

    const folders = await db.query.foldersTable.findMany({
        where: { userid },
        columns: {
            userid: false,
        },
        with: {
            sets: {
                columns: {
                    id: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }

    })

    return folders.map(folder => ({
        ...folder,
        sets: folder.sets.map(s => s.id),
        setsCount: folder.sets.length
    }));
})


