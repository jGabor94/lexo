"use server"

import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Folder } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { aclMiddleware } from "@/lib/services/authorization/aclAuthorization"
import { getFolderAcl } from "@/lib/services/authorization/aclCallbacks"
import { Session } from "next-auth"
import { revalidateTag } from "next/cache"

interface Request {
    session: Session,
    params: [folderid: string, setid: string],
}

const SA_AddToFolder = createServerAction(isLogged, aclMiddleware(getFolderAcl, "update"), async ({ params }: Request) => {

    const [folderid, setid] = params

    await dbConnect()
    await Folder.updateOne({ _id: folderid }, { $addToSet: { sets: setid } })
    revalidateTag("folders")
    return createServerActionResponse()
})



export default SA_AddToFolder