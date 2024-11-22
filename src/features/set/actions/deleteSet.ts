"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { getSetAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { Folder } from "@/features/folder/models/FolderModel"
import { Progress } from "@/features/term/models/ProgressModel"
import { Term } from "@/features/term/models/TermModel"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Set } from "../models/SetModel"

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