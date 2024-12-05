import { db } from "@/drizzle/db";
import { and, eq } from "drizzle-orm";
import { favoriteSetsTable } from "../drizzle/schema";

export default async (userid: string, setid: string) => {
    const res = await db.query.favoriteSetsTable.findFirst({
        where: and(eq(favoriteSetsTable.userid, userid), eq(favoriteSetsTable.setid, setid))
    })

    return !!res
} 