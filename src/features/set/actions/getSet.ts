"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { createObjectId } from "@/utils"
import { Session } from "next-auth"
import getSet from "../queries/getSet"

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
