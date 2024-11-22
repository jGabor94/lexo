"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { createAcl, defaultAcl } from "@/features/authorization/acl"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"
import { Folder } from "../models/FolderModel"

interface Request {
    session: Session,
    params: [name: string],
}


const SA_CreateFolder = createServerAction(isLogged, aclMiddleware(createAcl, "create"), async ({ params, session }: Request) => {

    const [name] = params

    await dbConnect()
    const res = await Folder.create({ name, user: session.user._id, acl: { ...defaultAcl, [session.user.username]: true } })
    return createServerActionResponse({ payload: res })
})



export default SA_CreateFolder