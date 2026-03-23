"server only"

import { db } from "@/drizzle/db";

export const getOwnClassesQuery = async (teacherId: string, query?: Parameters<typeof db.query.classesTable.findMany>[0]) => (await db.query.usersTable.findFirst({
    where: { id: teacherId },
    with: {
        classes: {
            with: {
                teachers: {
                    columns: {
                        name: true,
                        image: true
                    },
                },
            },
            orderBy: query?.orderBy || {
                createdAt: "desc",
            },
            extras: query?.extras || undefined
        }
    }

}))?.classes


export const getClassQuery = async (id: string) => db.query.classesTable.findFirst({
    where: { id },

})
