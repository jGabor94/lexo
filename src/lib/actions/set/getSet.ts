"use server"

import { createObjectId } from "@/lib/assets/general"
import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { getSet } from "@/lib/database/queries"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { Session } from "next-auth"

interface Request {
    params: [setid: string],
    session: Session
}


const SA_GetSet = createServerAction(isLogged, async ({ params, session }: Request) => {

    const [setid] = params

    await dbConnect()
    const res = await getSet(createObjectId(setid), createObjectId(session.user._id))

    return createServerActionResponse({ payload: res })
})



export default SA_GetSet
