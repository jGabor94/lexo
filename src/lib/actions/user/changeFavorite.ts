"use server"

import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { User } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { Session } from "next-auth"
import { revalidateTag } from "next/cache"

interface Request {
    session: Session,
    params: [setid: string, isFavorite: boolean]
}

const SA_changeFavorite = createServerAction(isLogged, async ({ session, params }: Request) => {

    const [setid, isFavorite] = params

    await dbConnect()
    if (isFavorite) {
        await User.updateOne({ _id: session.user._id }, { $addToSet: { favoriteSets: [setid] } })
    } else {
        await User.updateOne({ _id: session.user._id }, { $pull: { favoriteSets: setid } })
    }
    revalidateTag("sets")

    return createServerActionResponse()
})

export default SA_changeFavorite