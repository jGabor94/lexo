"use server"

import { dbConnect } from "@/database/dbConnect"
import { isLogged } from "@/features/authentication/utils"
import { defaultAcl } from "@/features/authorization/acl"
import { ProgressResult } from "@/features/flashcard/types"
import { Set } from "@/features/set/models/SetModel"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"
import { Progress } from "../models/ProgressModel"

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


    return createServerActionResponse()
})



export default SA_UpdateProgress