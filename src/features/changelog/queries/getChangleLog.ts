"use server"

import { db } from "@/drizzle/db"
import { desc } from "drizzle-orm"
import { unstable_cache } from "next/cache"
import { changeLogsTable } from "../drizzle/schema"

export default unstable_cache(
    async () => await db.select().from(changeLogsTable).orderBy(desc(changeLogsTable.createdAt)),
    ["changeLog"], { tags: ["changeLog"] }
)
