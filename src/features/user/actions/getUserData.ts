"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { createObjectId } from "@/utils"
import { Session } from "next-auth"
import getUserData from "../queries/getUserData"

interface Request {
    session: Session
}

const SA_GetUserData = createServerAction(isLogged, async ({ session }: Request) => {
    await dbConnect()
    const user = await getUserData(createObjectId(session.user._id))

    if (user) {
        return createServerActionResponse({ payload: user })
    }

    return ({ status: 400 })


})

export default SA_GetUserData