"use server"

import { db } from "@/drizzle/db"
import { changeLogsTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { eq } from "drizzle-orm"
import { Session } from "next-auth"
import { revalidateTag } from "next/cache"

interface Request {
    params: [changelogid: string],
    session: Session
}

const SA_DeleteChangeLog = createServerAction(isLogged, aclMiddleware({ admin: true }, "delete"), async ({ params }: Request) => {
    const [changelogid] = params
    await db.delete(changeLogsTable).where(eq(changeLogsTable.id, changelogid))
    revalidateTag("changeLog")
    return createServerActionResponse()
})

export default SA_DeleteChangeLog