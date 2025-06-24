"use server"

import { db } from "@/drizzle/db"
import { setsTable, termsTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { defaultAcl } from "@/features/authorization/acl"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { Session } from "next-auth"
import getSet from "../queries/getSet"

interface Request {
    session: Session,
    params: [setid: string],
}

const SA_CreateCopy = createServerAction(isLogged, async ({ params, session }: Request) => {

    const [setid] = params

    const set = await getSet(setid)


    if (set) {
        const insertData = {
            name: `${set.name} - Másolat`,
            preferredTermLang: set.preferredTermLang,
            preferredDefinitionLang: set.preferredDefinitionLang,
            folderid: null,
            userid: session.user.id,
            acl: { ...defaultAcl, [session.user.username]: true }
        }

        const [res] = await db.insert(setsTable).values(insertData).returning()


        await db.insert(termsTable).values(set.terms.map((term) => ({
            term: term.term,
            definition: term.definition,
            setid: res.id,
            status: 0,
            acl: { ...defaultAcl, [session.user.username]: true },
        }))).returning()

        return createServerActionResponse({ payload: res })

    }

    return createServerActionResponse({ status: 400 })

})

export default SA_CreateCopy