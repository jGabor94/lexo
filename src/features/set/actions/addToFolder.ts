"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { getFolderAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { Folder } from "@/features/folder/models/FolderModel"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"

interface Request {
    session: Session,
    params: [folderid: string, setid: string],
}

const SA_AddToFolder = createServerAction(isLogged, aclMiddleware(getFolderAcl, "update"), async ({ params }: Request) => {

    const [folderid, setid] = params

    await dbConnect()
    await Folder.updateOne({ _id: folderid }, { $addToSet: { sets: setid } })
    return createServerActionResponse()
})



export default SA_AddToFolder