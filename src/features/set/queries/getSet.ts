import { db } from "@/drizzle/db"
import { setsTable, termsTable } from "@/drizzle/schema"
import { asc, eq } from "drizzle-orm"

const getSet = async (setid: string) => {

    const res = await db.query.setsTable.findFirst({
        where: eq(setsTable.id, setid),
        columns: {
            userid: false,
        },
        with: {
            terms: {
                orderBy: asc(termsTable.createdAt)
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


    return res

}

export default getSet