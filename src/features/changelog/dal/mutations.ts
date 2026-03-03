"use server"

import { db } from "@/drizzle/db"
import { Dal } from "@/lib/dal"
import { eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import z from "zod"
import { changeLogsTable } from "../drizzle/schema"

export const createChangeLog = Dal.create()
    .$Input<[data: { description: string, date: Date }]>()
    .schema({
        input: z.tuple([z.object({
            description: z.string(),
            date: z.date()
        }
        )]),
    })
    .authenticate()
    .authorize({
        resource: "changelog",
        action: "create",
    })
    .operation(async ({ input: [data] }) => {
        await db.insert(changeLogsTable).values(data)
        revalidateTag("changeLog")
    })

export const deleteChangeLog = Dal.create()
    .$Input<[changelogid: string]>()
    .schema({
        input: z.tuple([z.string()]),
    })
    .authenticate()
    .authorize({
        resource: "changelog",
        action: "delete",
    })
    .operation(async ({ input: [changelogid] }) => {
        await db.delete(changeLogsTable).where(eq(changeLogsTable.id, changelogid))
        revalidateTag("changeLog")
    })