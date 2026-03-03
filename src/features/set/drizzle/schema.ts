import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { foldersTable } from "@/features/folder/drizzle/schema";
import { languageCodes } from "@/features/term/lib/constants";
import { usersTable } from "@/features/user/drizzle/schema";
import { boolean, pgTable, primaryKey, text, uuid, varchar } from "drizzle-orm/pg-core";

export const setsTable = pgTable("sets", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: varchar('name', { length: 120 }).notNull(),
    preferredTermLang: varchar('preferredTermLang', { enum: languageCodes }).notNull(),
    preferredDefinitionLang: varchar('preferredDefinitionLang', { enum: languageCodes }).notNull(),
    public: boolean("public").default(true),
    userid: text("userid").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    createdAt,
    updatedAt,
});

export const setToFolderTable = pgTable("set_to_folders", {
    folderid: uuid("folderid").references(() => foldersTable.id, { onDelete: "cascade" }).notNull(),
    setid: uuid("setid").references(() => setsTable.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.folderid, t.setid] })],
);


export const favoriteSetsTable = pgTable("favorite_sets", {
    userid: text("userid").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    setid: uuid("setid").references(() => setsTable.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.userid, t.setid] })],
);



