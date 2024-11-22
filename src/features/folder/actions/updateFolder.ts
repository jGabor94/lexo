"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { getFolderAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"
import { revalidatePath } from "next/cache"
import { Folder } from "../models/FolderModel"

interface Request {
    session: Session,
    params: [folderid: string, query: { name?: string }],
}

const SA_UpdateFolder = createServerAction(isLogged, aclMiddleware(getFolderAcl, "update"), async ({ params, session }: Request) => {

    const [folderid, query] = params

    await dbConnect()
    await Folder.updateOne({ _id: folderid }, query)
    revalidatePath(`/folders/${folderid}`, "page")
    return createServerActionResponse()
})



export default SA_UpdateFolder