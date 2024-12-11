"use server"

import { db } from "@/drizzle/db"
import { changeLogsTable } from "@/drizzle/schema"
import { desc } from "drizzle-orm"
import { unstable_cache } from "next/cache"

export default unstable_cache(
    async () => await db.select().from(changeLogsTable).orderBy(desc(changeLogsTable.createdAt)),
    ["changeLog"], { tags: ["changeLog"] }
)
