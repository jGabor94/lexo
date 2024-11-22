"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { getTermAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Term } from "../models/TermModel"
import { TermInput } from "../types"

interface Request {
    params: [termid: string, newTerm: TermInput],
}

const SA_UpdateTerm = createServerAction(isLogged, aclMiddleware(getTermAcl, "update"), async ({ params }: Request) => {

    const [termid, newTerm] = params

    await dbConnect()
    await Term.updateOne({ _id: termid }, newTerm)
    return createServerActionResponse()
})

export default SA_UpdateTerm