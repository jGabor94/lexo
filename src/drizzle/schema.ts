import { languageCodes } from "@/constants/languages"
import { Acl } from "@/features/authorization/types"
import { LanguageCode } from "@/lib/language_tools/types"
import { relations, sql } from "drizzle-orm"
import { integer, json, pgTable, primaryKey, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { AdapterAccountType } from "next-auth/adapters"
import { createdAt, updatedAt } from "./schemaTypes"


export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    username: varchar('username', { length: 100 }).notNull(),
    password: varchar('password', { length: 100 }).notNull().default(''),
    email: varchar('email', { length: 100 }).unique().notNull(),
    name: varchar('name', { length: 100 }).default(''),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    roles: varchar('roles', { length: 100 }).array().notNull().default(sql`ARRAY[]::text[]`),
    image: varchar('image', { length: 255 }).default('').notNull(),
    theme: varchar('theme', { enum: ["light", "dark"] }).default('light').notNull(),
    createdAt,
    updatedAt,
});

export const accounts = pgTable("account", {
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
},
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)

export const termsTable = pgTable("term", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    setid: uuid("setid").references(() => setsTable.id, { onDelete: "cascade" }).notNull(),
    acl: json().$type<Acl>().notNull(),
    term: json().$type<{
        content: string;
        lang: LanguageCode;
    }>().notNull(),
    definition: json().$type<{
        content: string[];
        lang: LanguageCode;
    }>().notNull(),
    createdAt,
    updatedAt,
});

export const progressesTable = pgTable("progresse", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    termid: uuid("termid").notNull().references(() => termsTable.id, { onDelete: "cascade" }),
    userid: text("userid").notNull().references(() => users.id, { onDelete: "cascade" }),
    status: integer('status').default(0).notNull(),
    acl: json().$type<Acl>().notNull(),
    createdAt,
    updatedAt,
});

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

export const foldersTable = pgTable("folder", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: varchar('name', { length: 100 }).notNull(),
    userid: text("userid").references(() => users.id, { onDelete: "cascade" }).notNull(),
    acl: json().$type<Acl>().notNull(),
    createdAt,
    updatedAt,
});

export const changeLogsTable = pgTable("changelog", {
    id: uuid("id").primaryKey().defaultRandom(),
    description: text("description").notNull(),
    date: timestamp("date", { withTimezone: true }).notNull().defaultNow(),
    createdAt,
    updatedAt,
});


//relations----------------------------------------------------------------------------------------


export const termsTableRelations = relations(termsTable, ({ one, many }) => ({
    set: one(setsTable, {
        fields: [termsTable.setid],
        references: [setsTable.id],
    }),
    progresses: many(progressesTable)

})); export const foldersTableRelations = relations(foldersTable, ({ many, one }) => ({
    sets: many(setToFolderTable),
    user: one(users, {
        fields: [foldersTable.userid],
        references: [users.id]
    }),
}))

export const favoriteSetsTableRelations = relations(favoriteSetsTable, ({ one }) => ({
    user: one(users, {
        fields: [favoriteSetsTable.userid],
        references: [users.id],
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
    user: one(users, {
        fields: [setsTable.userid],
        references: [users.id]
    }),
    folders: many(setToFolderTable, { relationName: "set_folders" }),
}));


export const progressesTableRelations = relations(progressesTable, ({ one }) => ({
    term: one(termsTable, {
        fields: [progressesTable.termid],
        references: [termsTable.id],
    }),
    user: one(users, {
        fields: [progressesTable.userid],
        references: [users.id],
    }),
}));

export const usersTableRelations = relations(users, ({ many }) => ({
    sets: many(setsTable),
    folders: many(foldersTable),
    favorites: many(favoriteSetsTable, { relationName: "favorite_sets_user" })
}));



/*

export * from "@/features/changelog/drizzle/schema"
export * from "@/features/folder/drizzle/schema"
export * from "@/features/set/drizzle/schema"
export * from "@/features/term/drizzle/schema"
export * from "@/features/user/drizzle/schema"
import { foldersTable } from "@/features/folder/drizzle/schema"
import { favoriteSetsTable, setsTable, setToFolderTable } from "@/features/set/drizzle/schema"
import { progressesTable, termsTable } from "@/features/term/drizzle/schema"
import { users } from "@/features/user/drizzle/schema"
import { relations } from "drizzle-orm"


//relations----------------------------------------------------------------------------------------


export const termsTableRelations = relations(termsTable, ({ one, many }) => ({
    set: one(setsTable, {
        fields: [termsTable.setid],
        references: [setsTable.id],
    }),
    progresses: many(progressesTable)

}));

export const foldersTableRelations = relations(foldersTable, ({ many, one }) => ({
    sets: many(setToFolderTable),
    user: one(users, {
        fields: [foldersTable.userid],
        references: [users.id]
    }),
}))

export const favoriteSetsTableRelations = relations(favoriteSetsTable, ({ one }) => ({
    user: one(users, {
        fields: [favoriteSetsTable.userid],
        references: [users.id],
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
    user: one(users, {
        fields: [setsTable.userid],
        references: [users.id]
    }),
    folders: many(setToFolderTable, { relationName: "set_folders" }),
}));


export const progressesTableRelations = relations(progressesTable, ({ one }) => ({
    term: one(termsTable, {
        fields: [progressesTable.termid],
        references: [termsTable.id],
    }),
    user: one(users, {
        fields: [progressesTable.userid],
        references: [users.id],
    }),
}));

export const usersRelations = relations(users, ({ many }) => ({
    sets: many(setsTable),
    folders: many(foldersTable),
    favorites: many(favoriteSetsTable, { relationName: "favorite_sets_user" })
}));

*/