import { foldersTable } from "@/drizzle/schema";
import z from "zod";
import { getFolderQuery, getFoldersQuery } from "./drizzle/operations";
import { folderFormSchema } from "./zod";

export type Folder = NonNullable<Awaited<ReturnType<typeof getFolderQuery>>>
export type FolderListItem = Awaited<ReturnType<typeof getFoldersQuery>>[number]
export type InsertFolder = typeof foldersTable.$inferInsert;
export type SelectFolder = typeof foldersTable.$inferSelect;
export type FolderInput = z.infer<typeof folderFormSchema>

