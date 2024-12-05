"use server"

import { db } from "@/drizzle/db"
import { isLogged } from "@/features/authentication/utils"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { revalidateTag } from "next/cache"
import { changeLogsTable } from "../drizzle/schema"

interface Request {
    params: [data: { description: string, date: Date }],
}

const SA_CreateChangeLog = createServerAction(isLogged, aclMiddleware({ admin: true }, "create"), async ({ params }: Request) => {
    const [data] = params
    await db.insert(changeLogsTable).values(data)
    revalidateTag("changeLog")
    return createServerActionResponse()
})

export default SA_CreateChangeLog