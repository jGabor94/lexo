"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"
import { revalidateTag } from "next/cache"
import { ChangeLog } from "../models/ChangeLogModel"

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