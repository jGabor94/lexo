import { db } from "@/drizzle/db";
import { cache } from "react";

export const getTermsQuery = cache(async (setid: string) => db.query.termsTable.findMany({
    where: { setid },
})
)