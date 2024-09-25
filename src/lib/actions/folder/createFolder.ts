"use server"

import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Folder } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { createAcl, defaultAcl } from "@/lib/services/authorization/acl"
import { aclMiddleware } from "@/lib/services/authorization/aclAuthorization"
import { Session } from "next-auth"
import { revalidatePath } from "next/cache"

interface Request {
    session: Session,
    params: [name: string],
}

const timeout = () => new Promise(res => setTimeout(res, 4000))

const SA_CreateFolder = createServerAction(isLogged, aclMiddleware(createAcl, "create"), async ({ params, session }: Request) => {

    const [name] = params

    await dbConnect()
    await timeout()
    const res = await Folder.create({ name, user: session.user._id, acl: { ...defaultAcl, [session.user.username]: true } })
    revalidatePath("/folders", "page")
    return createServerActionResponse({ payload: res })
})



export default SA_CreateFolder