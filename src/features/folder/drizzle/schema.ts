import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { usersTable } from "@/features/user/drizzle/schema";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const foldersTable = pgTable("folders", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: varchar('name', { length: 100 }).notNull(),
    userid: text("userid").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    createdAt,
    updatedAt,
})

