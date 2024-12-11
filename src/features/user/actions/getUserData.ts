"use server"

import { isLogged } from "@/features/authentication/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"
import getUserData from "../queries/getUserData"

interface Request {
    session: Session
}

const SA_GetUserData = createServerAction(isLogged, async ({ session }: Request) => {
    const user = await getUserData(session.user.id)
    if (user) {
        return createServerActionResponse({ payload: user })
    }
    return createServerActionResponse({ status: 400 })
})

export default SA_GetUserData