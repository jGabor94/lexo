"use server"

import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Folder } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { aclMiddleware } from "@/lib/services/authorization/aclAuthorization"
import { getFolderAcl } from "@/lib/services/authorization/aclCallbacks"
import { Session } from "next-auth"
import { revalidatePath } from "next/cache"

interface Request {
    session: Session,
    params: [folderid: string, query: { name?: string }],
}

const SA_UpdateFolder = createServerAction(isLogged, aclMiddleware(getFolderAcl, "update"), async ({ params, session }: Request) => {

    const [folderid, query] = params

    await dbConnect()
    await Folder.updateOne({ _id: folderid }, query)
    revalidatePath("/folders", "page")
    revalidatePath(`/folder/${folderid}`, "page")
    return createServerActionResponse()
})



export default SA_UpdateFolder