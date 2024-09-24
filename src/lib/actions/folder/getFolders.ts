"use server"

import { createObjectId } from "@/lib/assets/general"
import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { getFolders } from "@/lib/database/queries"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { Session } from "next-auth"

interface Request {
    session: Session,
}

const SA_GetFolders = createServerAction(isLogged, async ({ session }: Request) => {

    await dbConnect()
    const res = await getFolders(createObjectId(session.user._id))
    return createServerActionResponse({ payload: res })
})



export default SA_GetFolders