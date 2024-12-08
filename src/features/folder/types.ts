import { foldersTable } from "@/drizzle/schema";
import getFolder from "./queries/getFolder";
import getFolders from "./queries/getFolders";

export type Folder = NonNullable<Awaited<ReturnType<typeof getFolder>>>
export type FolderListItem = Awaited<ReturnType<typeof getFolders>>[number]

export type InsertFolder = typeof foldersTable.$inferInsert;
export type SelectFolder = typeof foldersTable.$inferSelect;