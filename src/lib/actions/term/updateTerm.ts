"use server"

import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Term } from "@/lib/database/models"
import { ITerm } from "@/lib/database/types"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { aclMiddleware } from "@/lib/services/authorization/aclAuthorization"
import { getTermAcl } from "@/lib/services/authorization/aclCallbacks"

interface Request {
    params: [termid: string, newTerm: ITerm],
}

const SA_UpdateTerm = createServerAction(isLogged, aclMiddleware(getTermAcl, "update"), async ({ params }: Request) => {

    const [termid, newTerm] = params

    await dbConnect()
    await Term.updateOne({ _id: termid }, newTerm)
    return createServerActionResponse()
})

export default SA_UpdateTerm