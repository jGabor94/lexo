"use server";

import { dbConnect } from "@/database/dbConnect";
import { isLogged } from "@/features/authentication/utils";
import { createAcl, defaultAcl } from "@/features/authorization/acl";
import { aclMiddleware } from "@/features/authorization/utils";
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction";
import { createServerActionResponse } from "@/lib/serverAction/response/response";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { Progress } from "../models/ProgressModel";
import { Term } from "../models/TermModel";
import { TermInput } from "../types";

interface Request {
  params: [terms: Array<TermInput>, setid: string];
  session: Session;
}

const SA_CreateTerms = createServerAction(
  isLogged,
  aclMiddleware(createAcl, "create"),
  async ({ params, session }: Request) => {
    const [terms, setid] = params;
    await dbConnect();
    const createdTerms = await Term.create(
      terms.map((term) => ({
        ...term,
        set: setid,
        acl: { ...defaultAcl, [session.user.username]: true },
      }))
    );

    await Progress.create(
      createdTerms.map((term) => ({
        term: term._id,
        user: session.user._id,
        status: 0,
        isLearned: new Date(),
        acl: { ...defaultAcl, [session.user.username]: true },
      }))
    );
    revalidatePath(`sets/${setid}`, "page");
    return createServerActionResponse();
  }
);

export default SA_CreateTerms;
