"server only"

import { db } from "@/drizzle/db"
import { termsTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { cache } from "react"

export const getSetQuery = cache(async (setid: string) => db.query.setsTable.findFirst({
    where: {
        id: setid
    },
    columns: {
        userid: false,
    },
    with: {
        terms: {
            orderBy: {
                createdAt: "asc"
            }
        },
        user: {
            columns: {
                id: true,
                image: true,
                name: true
            },
        },
    }
})
)

export const getSetsQuery = cache(async (userid?: string) => db.query.setsTable.findMany({
    ...userid && {
        where: {
            userid: userid
        }
    },
    with: {
        user: {
            columns: {
                name: true,
                image: true
            }
        }
    },
    orderBy: {
        createdAt: "desc"
    },
    extras: {
        termsCount: (table) => db.$count(termsTable, eq(table.id, termsTable.setid))
    }
}))

export const getLikersQuery = cache(async (setid: string) => {
    const res = await db.query.setsTable.findFirst({
        where: {
            id: setid
        },
        columns: {},
        with: {
            likers: {
                columns: {
                    id: true,
                    name: true
                }
            }
        }
    })

    return res?.likers

})

export const getFavoritesQuery = cache(async (userid: string) => {

    const res = await db.query.usersTable.findFirst({
        where: {
            id: userid
        },
        columns: {},
        with: {
            favorites: {
                orderBy: {
                    createdAt: "desc"
                },
                extras: {
                    termsCount: (table) => db.$count(termsTable, eq(table.id, termsTable.setid))
                },
                with: {
                    user: {
                        columns: {
                            name: true,
                            image: true
                        }
                    }
                }
            }
        }
    })


    return res?.favorites
})


