"use server"

import { db } from "@/drizzle/db"
import { termsTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { getTermAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { eq } from "drizzle-orm"

interface Request {
    params: [termid: string],
}

const SA_DeleteTerm = createServerAction(isLogged, aclMiddleware(getTermAcl, "delete"), async ({ params }: Request) => {

    const [termid] = params
    await db.delete(termsTable).where(eq(termsTable.id, termid))
    return createServerActionResponse()
})

export default SA_DeleteTerm
