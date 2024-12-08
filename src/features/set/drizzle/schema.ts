import { languageCodes } from "@/constants/languages";
import { foldersTable, termsTable, usersTable } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { Acl } from "@/features/authorization/types";
import { relations } from "drizzle-orm";
import { json, pgTable, primaryKey, text, uuid, varchar } from "drizzle-orm/pg-core";

export const setsTable = pgTable("sets", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: varchar('name', { length: 120 }).notNull(),
    preferredTermLang: varchar('preferredTermLang', { enum: languageCodes }).notNull(),
    preferredDefinitionLang: varchar('preferredDefinitionLang', { enum: languageCodes }).notNull(),
    userid: text("userid").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    acl: json().$type<Acl>().notNull(),
    createdAt,
    updatedAt,
});

export const setToFolderTable = pgTable("set_to_folders", {
    folderid: uuid("folderid").references(() => foldersTable.id, { onDelete: "cascade" }).notNull(),
    setid: uuid("setid").references(() => setsTable.id, { onDelete: "cascade" }).notNull(),
}, (t) => ({
    pk: primaryKey({ columns: [t.folderid, t.setid] }),
}));




export const favoriteSetsTable = pgTable("favorite_sets", {
    userid: text("userid").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    setid: uuid("setid").references(() => setsTable.id, { onDelete: "cascade" }).notNull(),
}, (t) => ({
    pk: primaryKey({ columns: [t.userid, t.setid] }),
}));

export const favoriteSetsTableRelations = relations(favoriteSetsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [favoriteSetsTable.userid],
        references: [usersTable.id],
        relationName: "favorite_sets_user"
    }),
    set: one(setsTable, {
        fields: [favoriteSetsTable.setid],
        references: [setsTable.id],
        relationName: "user_favorite_sets"
    }),
}));

export const setToFolderTableRelations = relations(setToFolderTable, ({ one }) => ({
    folder: one(foldersTable, {
        fields: [setToFolderTable.folderid],
        references: [foldersTable.id],
        relationName: "folder_sets"
    }),
    set: one(setsTable, {
        fields: [setToFolderTable.setid],
        references: [setsTable.id],
        relationName: "set_folders"
    }),
}));

export const setsRelations = relations(setsTable, ({ many, one }) => ({
    terms: many(termsTable),
    user: one(usersTable, {
        fields: [setsTable.userid],
        references: [usersTable.id]
    }),
    folders: many(setToFolderTable, { relationName: "set_folders" }),
}));
