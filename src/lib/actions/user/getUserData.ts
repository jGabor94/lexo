"use server"

import { createObjectId } from "@/lib/assets/general"
import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import getUserData from "@/lib/database/queries/getUserData"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { Session } from "next-auth"

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