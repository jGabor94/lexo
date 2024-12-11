"use server";

import { db } from "@/drizzle/db";
import { isLogged } from "@/features/authentication/utils";
import { createAcl, defaultAcl } from "@/features/authorization/acl";
import { aclMiddleware } from "@/features/authorization/utils";
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction";
import { createServerActionResponse } from "@/lib/serverAction/response/response";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { TermInput } from "../types";
import { termsTable, progressesTable } from "@/drizzle/schema";

interface Request {
  params: [terms: Array<TermInput>, setid: string];
  session: Session;
}

const SA_CreateTerms = createServerAction(isLogged, aclMiddleware(createAcl, "create"), async ({ params, session }: Request) => {
  const [terms, setid] = params;

  const createdTerms = await db.insert(termsTable).values(terms.map((term) => ({
    term: term.term,
    definition: term.definition,
    setid: setid,
    acl: { ...defaultAcl, [session.user.username]: true },
  }))).returning()

  await db.insert(progressesTable).values(createdTerms.map((term) => ({
    termid: term.id,
    userid: session.user.id as string,
    status: 0,
    acl: { ...defaultAcl, [session.user.username]: true },
  })))


  revalidatePath(`sets/${setid}`, "page");
  return createServerActionResponse();
}
);

export default SA_CreateTerms;
