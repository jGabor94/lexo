"use server"

import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Folder, Progress, Set, Term } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { aclMiddleware } from "@/lib/services/authorization/aclAuthorization"
import { getSetAcl } from "@/lib/services/authorization/aclCallbacks"

interface Request {
    params: [setid: string],
}

const SA_DeleteSet = createServerAction(isLogged, aclMiddleware(getSetAcl, "delete"), async ({ params }: Request) => {
    const [setid] = params
    await dbConnect()

    const terms = await Term.find({ set: setid })

    await Set.findOneAndDelete({ _id: setid })
    await Folder.updateOne({ sets: { $in: setid } }, { $pull: { sets: setid } })
    await Term.deleteMany({ set: setid })
    await Progress.deleteMany({ term: { $in: terms.map(term => term._id) } })


    return createServerActionResponse()
})

export default SA_DeleteSet