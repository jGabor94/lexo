"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { createObjectId } from "@/utils"
import { Session } from "next-auth"
import getFolders from "../queries/getFolders"

interface Request {
    session: Session,
}

const SA_GetFolders = createServerAction(isLogged, async ({ session }: Request) => {

    await dbConnect()
    const res = await getFolders(createObjectId(session.user._id))
    return createServerActionResponse({ payload: res })
})



export default SA_GetFolders