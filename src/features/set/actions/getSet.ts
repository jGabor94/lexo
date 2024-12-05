"use server"

import { isLogged } from "@/features/authentication/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"
import getIsFavorite from "../queries/getIsFavorite"
import getSet from "../queries/getSet"

interface Request {
    params: [setid: string],
    session: Session
}


const SA_GetSet = createServerAction(isLogged, async ({ params, session }: Request) => {

    const [setid] = params

    const set = await getSet(setid, session.user.id)
    const favorite = await getIsFavorite(session.user.id, setid)

    return createServerActionResponse({ payload: { set, favorite } })

})



export default SA_GetSet
