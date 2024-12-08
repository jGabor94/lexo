"use server"

import { db } from "@/drizzle/db"
import { isLogged } from "@/features/authentication/utils"
import { getTermAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { eq } from "drizzle-orm"
import { TermInput } from "../types"
import { termsTable } from "@/drizzle/schema"

interface Request {
    params: [termid: string, newTerm: TermInput],
}

const SA_UpdateTerm = createServerAction(isLogged, aclMiddleware(getTermAcl, "update"), async ({ params }: Request) => {

    const [termid, newTerm] = params
    await db.update(termsTable).set(newTerm).where(eq(termsTable.id, termid))
    return createServerActionResponse()
})

export default SA_UpdateTerm