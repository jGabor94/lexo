"use server"

import { ProgressResult } from "@/components/flashCardModule/types"
import { createServerAction } from "@/lib/assets/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Progress, Set } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { defaultAcl } from "@/lib/services/authorization/acl"
import { Session } from "next-auth"
import { revalidateTag } from "next/cache"

interface Request {
    params: [newProgresses: ProgressResult[], setid: string],
    session: Session
}

const SA_UpdateProgress = createServerAction(isLogged, async ({ params, session }: Request) => {
    const [newProgresses, setid] = params
    await dbConnect()

    const promises = newProgresses.map(progress => {
        if (progress.progressid === null) return Progress.create({
            status: progress.status,
            term: progress.termid,
            user: session.user._id,
            isLearned: new Date(),
            acl: { ...defaultAcl, [session.user.username]: true }
        })

        return Progress.updateOne({ _id: progress.progressid }, {
            $set: { status: progress.status },
        })

    })

    await Promise.all(promises)
    await Set.updateOne({ _id: setid }, { updatedAt: new Date() })

    revalidateTag("sets")

    return createServerActionResponse()
})



export default SA_UpdateProgress