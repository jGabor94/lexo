import { foldersTable } from "@/drizzle/schema";
import { getFolderQuery, getFoldersQuery } from "./drizzle/operations";


export type Folder = NonNullable<Awaited<ReturnType<typeof getFolderQuery>>>
export type FolderListItem = Awaited<ReturnType<typeof getFoldersQuery>>[number]

export type InsertFolder = typeof foldersTable.$inferInsert;
export type SelectFolder = typeof foldersTable.$inferSelect;