"use server"

import { db } from "@/drizzle/db"
import { setsTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { createAcl, defaultAcl } from "@/features/authorization/acl"
import { aclMiddleware } from "@/features/authorization/utils"
import { SetInput } from "@/features/set/components/SetForm"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"

interface Request {
    session: Session,
    params: [data: SetInput, folderid: string | null],
}

const SA_CreateSet = createServerAction(isLogged, aclMiddleware(createAcl, "create"), async ({ params, session }: Request) => {

    const [data, folderid] = params

    const insertData = {
        ...data,
        folderid,
        userid: session.user.id,
        acl: { ...defaultAcl, [session.user.username]: true }
    }

    const [res] = await db.insert(setsTable).values(insertData).returning()
    return createServerActionResponse({ payload: res })
})



export default SA_CreateSet