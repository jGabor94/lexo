import { accountsTable, usersTable } from "@/drizzle/schema";
import { Mongoose_User } from "./models/UserModel";

export type UserRaw = Omit<Mongoose_User, "_id" | "currentTime" | "favoriteSets"> & { _id: string } & { favoriteSets: string[] }
export type User = Omit<UserRaw, "password">

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertAccount = typeof usersTable.$inferInsert;
export type SelectAccount = typeof accountsTable.$inferSelect;
