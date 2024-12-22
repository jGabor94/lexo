"use server"

import { db } from "@/drizzle/db"
import { setsTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { getSetAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { eq, sql } from "drizzle-orm"
import { termsTable } from "../drizzle/schema"

interface Request {
    params: [setid: string, successTermsId: string[], wrongTermsId: string[]],
}

const SA_UpdateProgress = createServerAction(isLogged, aclMiddleware(getSetAcl, "update"), async ({ params }: Request) => {

    const [setid, successTermsId, wrongTermsId] = params

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