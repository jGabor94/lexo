"use server"

import { isLogged } from "@/features/authentication/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"
import getFolders from "../queries/getFolders"

interface Request {
    session: Session,
}

const SA_GetFolders = createServerAction(isLogged, async ({ session }: Request) => {
    const res = await getFolders(session.user.id)
    return createServerActionResponse({ payload: res })
})



export default SA_GetFolders