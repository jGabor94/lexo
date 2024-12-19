"use server"

import { db } from "@/drizzle/db"
import { setsTable, termsTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { getTermAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { eq, sql } from "drizzle-orm"
import { Session } from "next-auth"

interface Request {
    params: [successTermsId: string[], wrongTermsId: string[], setid: string],
    session: Session
}

const SA_UpdateProgress = createServerAction(isLogged, aclMiddleware(getTermAcl, "update"), async ({ params, session }: Request) => {

    const [successTermsId, wrongTermsId, setid] = params

    const promises1 = wrongTermsId.map(termid => db.update(termsTable)
        .set({ status: sql`GREATEST(${termsTable}.status - 1, 0)` })
        .where(eq(termsTable.id, termid))
    )

    const promises2 = successTermsId.map(termid => db.update(termsTable)
        .set({ status: sql`LEAST(${termsTable}.status + 1, 5)` })
        .where(eq(termsTable.id, termid))
    )

    await Promise.all([...promises1, ...promises2])
    await db.update(setsTable).set({ updatedAt: new Date() }).where(eq(setsTable.id, setid))

    return createServerActionResponse()
})



export default SA_UpdateProgress