"use server"

import { db } from "@/drizzle/db"
import { isLogged } from "@/features/authentication/utils"
import { getFolderAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"
import { revalidatePath } from "next/cache"
import { setToFolderTable } from "../drizzle/schema"

interface Request {
    session: Session,
    params: [folderid: string, setid: string],
}

const SA_AddToFolder = createServerAction(isLogged, aclMiddleware(getFolderAcl, "update"), async ({ params }: Request) => {

    const [folderid, setid] = params
    await db.insert(setToFolderTable).values({ folderid, setid })
    revalidatePath(`/folders/${folderid}`, "page")

    return createServerActionResponse()

})

export default SA_AddToFolder