"use server"

import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { User } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { Session } from "next-auth"

interface Request {
    session: Session
}

const SA_GetUserConfig = createServerAction(isLogged, async ({ session }: Request) => {
    await dbConnect()
    const user = await User.findOne({ _id: session.user._id }).populate("config")
    if (user) {
        return createServerActionResponse({ status: 200, payload: user.config })
    }

    return createServerActionResponse({ status: 400 })

})

export default SA_GetUserConfig