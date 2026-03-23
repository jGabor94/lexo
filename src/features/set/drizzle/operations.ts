"server only"

import { db } from "@/drizzle/db"
import { termsTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getSetQuery = async (setid: string) => db.query.setsTable.findFirst({
    where: {
        id: setid
    },
    columns: {
        userid: false,
    },
    with: {
        terms: {
            orderBy: {
                createdAt: "asc",
                id: "asc"
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




export const getSetsQuery = async (query: Parameters<typeof db.query.setsTable.findMany>[0]) => db.query.setsTable.findMany({
    ...query,
    with: {
        user: {
            columns: {
                name: true,
                image: true
            },
        },
    },
    orderBy: query?.orderBy || {
        createdAt: "desc",
    },
    extras: {
        termsCount: (table) => db.$count(termsTable, eq(table.id, termsTable.setid)),
        ...query?.extras
    }
})

export const getLikersQuery = async (setid: string) => {
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
}

export const getFavoritesQuery = async (userid: string, query?: Parameters<typeof db.query.setsTable.findMany>[0]) => {
    const res = await db.query.usersTable.findFirst({
        where: {
            id: userid
        },
        columns: {},
        with: {
            favorites: {
                with: {
                    user: {
                        columns: {
                            name: true,
                            image: true
                        },
                    },
                },
                orderBy: query?.orderBy || {
                    createdAt: "desc",
                },
                extras: {
                    termsCount: (table) => db.$count(termsTable, eq(table.id, termsTable.setid)),
                    ...query?.extras
                },
            }
        }
    })

    return res?.favorites
}


