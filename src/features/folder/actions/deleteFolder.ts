"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { getFolderAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { Set } from "@/features/set/models/SetModel"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"
import { Folder } from "../models/FolderModel"

interface Request {
    session: Session,
    params: [folderid: string],
}

const SA_DeleteFolder = createServerAction(isLogged, aclMiddleware(getFolderAcl, "delete"), async ({ params, session }: Request) => {

    const [folderid] = params

    await dbConnect()
    await Folder.deleteOne({ _id: folderid })
    await Set.updateMany({ folder: folderid }, { folder: null })
    return createServerActionResponse()
})



export default SA_DeleteFolder