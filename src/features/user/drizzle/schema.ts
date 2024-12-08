import { favoriteSetsTable, foldersTable, setsTable } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { relations, sql } from "drizzle-orm";
import { integer, pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

export const usersTable = pgTable("users", {
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

export const accountsTable = pgTable("account", {
    userId: text("userId")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
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


export const usersRelations = relations(usersTable, ({ many }) => ({
    sets: many(setsTable),
    folders: many(foldersTable),
    favorites: many(favoriteSetsTable, { relationName: "favorite_sets_user" })
}));