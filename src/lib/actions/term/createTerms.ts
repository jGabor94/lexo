"use server"

import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Progress, Term } from "@/lib/database/models"
import { ITerm } from "@/lib/database/types"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { createAcl, defaultAcl } from "@/lib/services/authorization/acl"
import { aclMiddleware } from "@/lib/services/authorization/aclAuthorization"
import { Session } from "next-auth"

interface Request {
    params: [terms: Array<ITerm>, setid: string],
    session: Session
}

const SA_CreateTerms = createServerAction(isLogged, aclMiddleware(createAcl, "create"), async ({ params, session }: Request) => {
    const [terms, setid] = params
    await dbConnect()
    const createdTerms = await Term.create(terms.map((term) => ({ ...term, set: setid, acl: { ...defaultAcl, [session.user.username]: true } })))

    await Progress.create(createdTerms.map((term) => ({
        term: term._id,
        user: session.user._id,
        status: 1,
        isLearned: new Date(),
        acl: { ...defaultAcl, [session.user.username]: true }
    })))

    return createServerActionResponse()
})



export default SA_CreateTerms