"use server"

import { SetInput } from "@/components/set/SetForm"
import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Set } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { aclMiddleware } from "@/lib/services/authorization/aclAuthorization"
import { getSetAcl } from "@/lib/services/authorization/aclCallbacks"
import { revalidateTag } from "next/cache"

interface Request {
    params: [setid: string, data: SetInput],
}

const SA_UpdateSet = createServerAction(isLogged, aclMiddleware(getSetAcl, "update"), async ({ params }: Request) => {
    const [setid, data] = params
    await dbConnect()
    await Set.updateOne({ _id: setid }, data)
    revalidateTag("sets")
    return createServerActionResponse()
})

export default SA_UpdateSet