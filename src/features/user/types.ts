import { accountsTable, usersTable } from "@/drizzle/schema";

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertAccount = typeof usersTable.$inferInsert;
export type SelectAccount = typeof accountsTable.$inferSelect;
