"use server"

import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { User } from "@/lib/database/models"
import { UserConfig } from "@/lib/database/types"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { Session } from "next-auth"

interface Request {
    params: [query: UserConfig],
    session: Session
}

const SA_ConfigUpdate = createServerAction(isLogged, async ({ params, session }: Request) => {
    const [query] = params
    await dbConnect()
    const res = await User.findOneAndUpdate({ _id: session.user._id }, { config: query }, { new: true })

    if (res) {
        return createServerActionResponse({ status: 200, payload: res?.config })
    }

    return createServerActionResponse({ status: 400 })

})

export default SA_ConfigUpdate