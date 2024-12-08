"use server"

import { db } from "@/drizzle/db"
import { foldersTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { getFolderAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

interface Request {
    params: [folderid: string, query: { name?: string }],
}

const SA_UpdateFolder = createServerAction(isLogged, aclMiddleware(getFolderAcl, "update"), async ({ params }: Request) => {

    const [folderid, query] = params
    await db.update(foldersTable).set(query).where(eq(foldersTable.id, folderid))
    revalidatePath(`/folders/${folderid}`, "page")
    return createServerActionResponse()
})



export default SA_UpdateFolder