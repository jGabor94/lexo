import { SetListItem } from "../set/types"
import { folderTable } from "./drizzle/schema"
import { Mongoose_Folder } from "./models/FolderModel"

export type FolderRaw<T = {}> = Omit<Mongoose_Folder, "_id" | "currentTime" | keyof T> & { _id: string } & (T extends { user: infer U } ? { user: U } : { user: string }) & (T extends { sets: infer U } ? { sets: U } : { sets: string[] }) & T

export type Folder = FolderRaw<{
    user: { name: string, image: string },
    sets: Array<SetListItem>
}>
export type FolderListItem = FolderRaw<{ setsCount: number }>

export type InsertFolder = typeof folderTable.$inferInsert;
export type SelectFolder = typeof folderTable.$inferSelect;