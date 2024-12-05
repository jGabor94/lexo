import { setToFolderTable, usersTable } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { Acl } from "@/features/authorization/types";
import { relations } from "drizzle-orm";
import { json, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const foldersTable = pgTable("folders", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: varchar('name', { length: 100 }).notNull(),
    userid: text("userid").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    acl: json().$type<Acl>().notNull(),
    createdAt,
    updatedAt,
});

export const foldersTableRelations = relations(foldersTable, ({ many, one }) => ({
    sets: many(setToFolderTable),
    user: one(usersTable, {
        fields: [foldersTable.userid],
        references: [usersTable.id]
    }),
}))