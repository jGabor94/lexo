"use server"

import { db } from "@/drizzle/db"
import { progressesTable, setsTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { defaultAcl } from "@/features/authorization/acl"
import { ProgressResult } from "@/features/flashcard/types"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { eq } from "drizzle-orm"
import { Session } from "next-auth"

interface Request {
    params: [newProgresses: ProgressResult[], setid: string],
    session: Session
}

const SA_UpdateProgress = createServerAction(isLogged, async ({ params, session }: Request) => {

    const [newProgresses, setid] = params

    const promises = newProgresses.map(progress => {
        if (progress.progressid === null) return db.insert(progressesTable).values({
            status: progress.status,
            termid: progress.termid,
            userid: session.user.id,
            acl: { ...defaultAcl, [session.user.username]: true }
        })

        return db.update(progressesTable).set({ status: progress.status }).where(eq(progressesTable.id, progress.progressid))

    })

    await Promise.all(promises)

    await db.update(setsTable).set({ updatedAt: new Date() }).where(eq(setsTable.id, setid))

    return createServerActionResponse()
})



export default SA_UpdateProgress