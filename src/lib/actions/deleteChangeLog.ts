"use server"

import { Session } from "next-auth"
import { revalidateTag } from "next/cache"
import { createServerAction } from "../assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "../assets/serverAction/response/response"
import { dbConnect } from "../database/dbConnect"
import { ChangeLog } from "../database/models"
import { isLogged } from "../middlewares/ServerAction-Middlewares"
import { aclMiddleware } from "../services/authorization/aclAuthorization"

interface Request {
    params: [_id: string],
    session: Session
}

const SA_DeleteChangeLog = createServerAction(isLogged, aclMiddleware({ admin: true }, "delete"), async ({ params }: Request) => {
    const [_id] = params
    await dbConnect()
    await ChangeLog.deleteOne({ _id })
    revalidateTag("changeLog")
    return createServerActionResponse()
})



export default SA_DeleteChangeLog