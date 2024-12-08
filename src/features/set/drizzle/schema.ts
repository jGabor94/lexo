import { languageCodes } from "@/constants/languages";
import { foldersTable, users } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { Acl } from "@/features/authorization/types";
import { json, pgTable, primaryKey, text, uuid, varchar } from "drizzle-orm/pg-core";

export const setsTable = pgTable("set", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: varchar('name', { length: 120 }).notNull(),
    preferredTermLang: varchar('preferredTermLang', { enum: languageCodes }).notNull(),
    preferredDefinitionLang: varchar('preferredDefinitionLang', { enum: languageCodes }).notNull(),
    userid: text("userid").references(() => users.id, { onDelete: "cascade" }).notNull(),
    acl: json().$type<Acl>().notNull(),
    createdAt,
    updatedAt,
});

export const setToFolderTable = pgTable("set_to_folder", {
    folderid: uuid("folderid").references(() => foldersTable.id, { onDelete: "cascade" }).notNull(),
    setid: uuid("setid").references(() => setsTable.id, { onDelete: "cascade" }).notNull(),
}, (t) => ({
    pk: primaryKey({ columns: [t.folderid, t.setid] }),
}));




export const favoriteSetsTable = pgTable("favorite_set", {
    userid: text("userid").references(() => users.id, { onDelete: "cascade" }).notNull(),
    setid: uuid("setid").references(() => setsTable.id, { onDelete: "cascade" }).notNull(),
}, (t) => ({
    pk: primaryKey({ columns: [t.userid, t.setid] }),
}));

