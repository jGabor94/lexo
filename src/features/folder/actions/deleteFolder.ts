"use server"

import { db } from "@/drizzle/db"
import { foldersTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { getFolderAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { eq } from "drizzle-orm"

interface Request {
    params: [folderid: string],
}

const SA_DeleteFolder = createServerAction(isLogged, aclMiddleware(getFolderAcl, "delete"), async ({ params }: Request) => {
    const [folderid] = params
    await db.delete(foldersTable).where(eq(foldersTable.id, folderid))
    return createServerActionResponse()
})

export default SA_DeleteFolder