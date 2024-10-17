"use server"

import { SetInput } from "@/components/set/SetForm"
import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Folder, Set } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { createAcl, defaultAcl } from "@/lib/services/authorization/acl"
import { aclMiddleware } from "@/lib/services/authorization/aclAuthorization"
import { Session } from "next-auth"

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