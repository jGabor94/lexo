"use server"

import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Folder } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { aclMiddleware } from "@/lib/services/authorization/aclAuthorization"
import { getFolderAcl } from "@/lib/services/authorization/aclCallbacks"
import { Session } from "next-auth"
import { revalidatePath, revalidateTag } from "next/cache"

interface Request {
    session: Session,
    params: [folderid: string, setid: string]
}

const SA_RemoveFromFolder = createServerAction(isLogged, aclMiddleware(getFolderAcl, "delete"), async ({ session, params }: Request) => {

    const [folderid, setid] = params

    await dbConnect()
    await Folder.updateOne({ _id: folderid }, { $pull: { sets: setid } })
    revalidatePath(`/folders/${folderid}`, "page")
    revalidateTag("folders")
    return createServerActionResponse()
})



export default SA_RemoveFromFolder