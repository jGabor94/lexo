"use server"

import { db } from "@/drizzle/db"
import { setsTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { getSetAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { SetInput } from "@/features/set/components/SetForm"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { eq } from "drizzle-orm"

interface Request {
    params: [setid: string, data: SetInput],
}

const SA_UpdateSet = createServerAction(isLogged, aclMiddleware(getSetAcl, "update"), async ({ params }: Request) => {

    const [setid, data] = params
    await db.update(setsTable).set(data).where(eq(setsTable.id, setid))
    return createServerActionResponse()
})

export default SA_UpdateSet