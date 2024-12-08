import { accounts, users } from "@/drizzle/schema";

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertAccount = typeof users.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;
