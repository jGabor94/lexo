"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { getSetAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { SetInput } from "@/features/set/components/SetForm"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Set } from "../models/SetModel"

interface Request {
    params: [setid: string, data: SetInput],
}

const SA_UpdateSet = createServerAction(isLogged, aclMiddleware(getSetAcl, "update"), async ({ params }: Request) => {
    const [setid, data] = params
    await dbConnect()
    await Set.updateOne({ _id: setid }, data)
    return createServerActionResponse()
})

export default SA_UpdateSet