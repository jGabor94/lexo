import { users } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { Acl } from "@/features/authorization/types";
import { json, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const foldersTable = pgTable("folder", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: varchar('name', { length: 100 }).notNull(),
    userid: text("userid").references(() => users.id, { onDelete: "cascade" }).notNull(),
    acl: json().$type<Acl>().notNull(),
    createdAt,
    updatedAt,
});