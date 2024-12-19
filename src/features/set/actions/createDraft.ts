"use server"

import { db } from "@/drizzle/db"
import { setsTable, termsTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { defaultAcl } from "@/features/authorization/acl"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { eq } from "drizzle-orm"
import { Session } from "next-auth"

interface Request {
    session: Session,
    params: [setid: string],
}

const SA_CreateDraft = createServerAction(isLogged, async ({ params, session }: Request) => {

    const [setid] = params

    const set = await db.query.setsTable.findFirst({ where: eq(setsTable.id, setid) })

    const terms = await db.query.termsTable.findMany({ where: eq(termsTable.setid, setid) })


    if (set) {
        const insertData = {
            name: `${set.name} - Draft`,
            preferredTermLang: set.preferredTermLang,
            preferredDefinitionLang: set.preferredDefinitionLang,
            folderid: null,
            userid: session.user.id,
            acl: { ...defaultAcl, [session.user.username]: true }
        }

        const [res] = await db.insert(setsTable).values(insertData).returning()


        await db.insert(termsTable).values(terms.map((term) => ({
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

export default SA_CreateDraft