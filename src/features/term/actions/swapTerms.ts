"use server"

import { db } from "@/drizzle/db"
import { setsTable, termsTable } from "@/drizzle/schema"
import { isLogged } from "@/features/authentication/utils"
import { getSetAcl } from "@/features/authorization/aclCallbacks"
import { aclMiddleware } from "@/features/authorization/utils"
import { LanguageCode } from "@/lib/language_tools/types"
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction"
import { createServerActionResponse } from "@/lib/serverAction/response/response"
import { eq } from "drizzle-orm"

interface Request {
    params: [setid: string, preferredTermLang: LanguageCode, preferredDefinitionLang: LanguageCode],
}

const SA_SwapTerms = createServerAction(isLogged, aclMiddleware(getSetAcl, "update"), async ({ params }: Request) => {

    const [setid, preferredTermLang, preferredDefinitionLang] = params

    const terms = await db.select().from(termsTable).where(eq(termsTable.setid, setid))

    await Promise.all(terms.map(({ term, definition, id }) => {

        const newDefinition = { ...term, content: term.content.split(", ") }
        const newTerm = { ...definition, content: definition.content.join(", ") }

        return db.update(termsTable).set({ status: 0, term: newTerm, definition: newDefinition }).where(eq(termsTable.id, id))
    }))

    await db.update(setsTable).set({ preferredTermLang: preferredDefinitionLang, preferredDefinitionLang: preferredTermLang }).where(eq(setsTable.id, setid))

    return createServerActionResponse()
})

export default SA_SwapTerms