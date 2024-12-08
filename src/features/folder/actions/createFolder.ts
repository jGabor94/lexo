"use server"

import { db } from "@/drizzle/db"
import { foldersTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { createAcl, defaultAcl } from "@/features/authorization/acl"
import { aclMiddleware } from "@/features/authorization/utils"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"

interface Request {
    session: Session,
    params: [name: string],
}


const SA_CreateFolder = createServerAction(isLogged, aclMiddleware(createAcl, "create"), async ({ params, session }: Request) => {

    const [name] = params
    const [res] = await db.insert(foldersTable).values({ name, userid: session.user.id, acl: { ...defaultAcl, [session.user.username]: true } }).returning()
    return createServerActionResponse({ payload: res })

})



export default SA_CreateFolder