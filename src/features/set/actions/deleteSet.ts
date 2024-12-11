"use server"

import { db } from "@/drizzle/db"
import { setsTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { getSetAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { eq } from "drizzle-orm"

interface Request {
    params: [setid: string],
}

const SA_DeleteSet = createServerAction(isLogged, aclMiddleware(getSetAcl, "delete"), async ({ params }: Request) => {
    const [setid] = params
    await db.delete(setsTable).where(eq(setsTable.id, setid))
    return createServerActionResponse()
})

export default SA_DeleteSet