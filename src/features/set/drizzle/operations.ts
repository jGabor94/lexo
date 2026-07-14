"server only"

import { db } from "@/drizzle/db"
import { termsTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getSetQuery = async (setid: string, userId: string, taskid?: string) => {
    const res = await db.query.setsTable.findFirst({
        where: {
            id: setid
        },
        columns: {
            userid: false,
        },
        with: {
            ...taskid && {
                tasks: {
                    where: {
                        id: taskid
                    }
                }
            },
            terms: {
                orderBy: {
                    createdAt: "asc",
                    id: "asc"
                },
                with: {
                    progresses: {
                        where: {
                            userId,
                            taskId: taskid
                        },
                    }
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


    if (res) {
        const { tasks, ...set } = res
        return {
            ...set,
            task: tasks?.length > 0 ? tasks[0] : null,
            terms: set?.terms.map(({ progresses, ...term }) => ({
                ...term,
                progress: progresses[0] ? progresses[0] : null
            }))
        }
    }
    return res

}




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


