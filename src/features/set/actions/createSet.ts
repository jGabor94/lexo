"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { createAcl, defaultAcl } from "@/features/authorization/acl"
import { aclMiddleware } from "@/features/authorization/utils"
import { Folder } from "@/features/folder/models/FolderModel"
import { SetInput } from "@/features/set/components/SetForm"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"
import { Set } from "../models/SetModel"

interface Request {
    session: Session,
    params: [data: SetInput, folderid: string | null],
}

const SA_CreateSet = createServerAction(isLogged, aclMiddleware(createAcl, "create"), async ({ params, session }: Request) => {

    const [data, folderid] = params

    await dbConnect()
    const res = await Set.create({ ...data, folder: folderid, user: session.user._id, acl: { ...defaultAcl, [session.user.username]: true } })
    if (folderid) {
        await Folder.updateOne({ _id: folderid }, { $addToSet: { sets: res._id } })
    }
    return createServerActionResponse({ payload: res })
})



export default SA_CreateSet