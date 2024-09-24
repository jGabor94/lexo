"use server"

import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Folder, Set } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { aclMiddleware } from "@/lib/services/authorization/aclAuthorization"
import { getFolderAcl } from "@/lib/services/authorization/aclCallbacks"
import { Session } from "next-auth"
import { revalidatePath } from "next/cache"

interface Request {
    session: Session,
    params: [folderid: string],
}

const SA_DeleteFolder = createServerAction(isLogged, aclMiddleware(getFolderAcl, "delete"), async ({ params, session }: Request) => {

    const [folderid] = params

    await dbConnect()
    await Folder.deleteOne({ _id: folderid })
    await Set.updateMany({ folder: folderid }, { folder: null })
    revalidatePath("/folders", "page")
    return createServerActionResponse()
})



export default SA_DeleteFolder