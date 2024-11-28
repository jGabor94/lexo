import { languageCodes } from "@/constants/languages";
import { usersTable } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { Acl } from "@/features/authorization/types";
import { folderTable } from "@/features/folder/drizzle/schema";
import { json, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const setsTable = pgTable("sets", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull(),
    preferredTermLang: varchar('preferredTermLang', { enum: languageCodes }).notNull(),
    preferredDefinitionLang: varchar('preferredTermLang', { enum: languageCodes }).notNull(),
    userid: text("userid").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    folderid: uuid("folderid").notNull().references(() => folderTable.id).unique(),
    acl: json().$type<Acl>().notNull(),
    createdAt,
    updatedAt,
});



