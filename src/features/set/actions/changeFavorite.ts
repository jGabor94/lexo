"use server"

import { db } from "@/drizzle/db"
import { favoriteSetsTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { and, eq } from "drizzle-orm"
import { Session } from "next-auth"
import { revalidateTag } from "next/cache"

interface Request {
    session: Session,
    params: [setid: string, isFavorite: boolean]
}

const SA_ChangeFavorite = createServerAction(isLogged, async ({ session, params }: Request) => {

    const [setid, isFavorite] = params

    if (isFavorite) {
        await db.insert(favoriteSetsTable).values({ userid: session.user.id, setid })
    } else {
        await db.delete(favoriteSetsTable).where(and(eq(favoriteSetsTable.userid, session.user.id), eq(favoriteSetsTable.setid, setid)));
    }
    revalidateTag("sets")

    return createServerActionResponse()
})

export default SA_ChangeFavorite