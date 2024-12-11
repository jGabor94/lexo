import { db } from "@/drizzle/db";
import { favoriteSetsTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export default async (userid: string, setid: string) => {
    const res = await db.query.favoriteSetsTable.findFirst({
        where: and(eq(favoriteSetsTable.userid, userid), eq(favoriteSetsTable.setid, setid))
    })

    return !!res
} 