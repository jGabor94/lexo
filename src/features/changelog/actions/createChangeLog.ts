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
    params: [data: { description: string, date: Date | string | null }],
    session: Session
}

const SA_CreateChangeLog = createServerAction(isLogged, aclMiddleware({ admin: true }, "create"), async ({ params, session }: Request) => {
    const [data] = params
    await dbConnect()
    await ChangeLog.create(data)
    revalidateTag("changeLog")
    return createServerActionResponse()
})

export default SA_CreateChangeLog