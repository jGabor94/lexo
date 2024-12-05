"use server"

import { db } from "@/drizzle/db"
import { setToFolderTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { getFolderAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

interface Request {
    params: [folderid: string, setid: string]
}

const SA_RemoveFromFolder = createServerAction(isLogged, aclMiddleware(getFolderAcl, "delete"), async ({ params }: Request) => {

    const [folderid, setid] = params
    await db.delete(setToFolderTable).where(and(eq(setToFolderTable.folderid, folderid), eq(setToFolderTable.setid, setid)))
    revalidatePath(`/folders/${folderid}`, "page")
    return createServerActionResponse()
})



export default SA_RemoveFromFolder