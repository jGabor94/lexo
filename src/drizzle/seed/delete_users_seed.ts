import { db } from "@/drizzle/db";
import { inArray } from "drizzle-orm";
import { users } from "../mock";
import { usersTable } from "../schema";


(async () => {
    const result = await db.delete(usersTable).where(inArray(usersTable.username, users.map((user) => user.username))).returning();
    console.log(result)
    await (db as any).client?.end?.()
    process.exit(0)
})()