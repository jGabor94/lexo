"use server"

import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Progress, Term } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { aclMiddleware } from "@/lib/services/authorization/aclAuthorization"
import { getTermAcl } from "@/lib/services/authorization/aclCallbacks"

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
