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
    params: [folderid: string, setid: string]
}

const SA_RemoveFromFolder = createServerAction(isLogged, aclMiddleware(getFolderAcl, "delete"), async ({ session, params }: Request) => {

    const [folderid, setid] = params

    await dbConnect()
    await Folder.updateOne({ _id: folderid }, { $pull: { sets: setid } })
    revalidatePath(`/folders/${folderid}`, "page")
    return createServerActionResponse()
})



export default SA_RemoveFromFolder