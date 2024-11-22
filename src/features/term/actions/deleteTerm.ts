"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { getTermAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Progress } from "../models/ProgressModel"
import { Term } from "../models/TermModel"

interface Request {
    params: [termid: string],
}

const SA_DeleteTerm = createServerAction(isLogged, aclMiddleware(getTermAcl, "delete"), async ({ params }: Request) => {

    const [termid] = params

    await dbConnect()
    await Term.deleteOne({ _id: termid })
    await Progress.deleteMany({ term: termid })
    return createServerActionResponse()
})

export default SA_DeleteTerm
