import { db } from "@/drizzle/db"
import { progressesTable, setsTable, termsTable } from "@/drizzle/schema"
import { asc, eq } from "drizzle-orm"

const getSet = async (setid: string, userid: string) => {

    const res = await db.query.setsTable.findFirst({
        where: eq(setsTable.id, setid),
        columns: {
            userid: false,
        },
        with: {
            terms: {
                with: {
                    progresses: {
                        where: eq(progressesTable.userid, userid),
                        columns: {
                            userid: false
                        }
                    }
                },
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


    return res && { ...res, terms: [...res.terms.map(({ progresses, ...rest }) => ({ ...rest, progress: progresses[0] }))] }

}

export default getSet