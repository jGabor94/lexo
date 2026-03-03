import { setsTable } from "@/drizzle/schema";
import * as z from 'zod';
import { getLikers } from "./dal/queries";
import { getSetQuery, getSetsQuery } from "./drizzle/operations";
import { setFormSchema } from "./zod/schema";

export type SetListItem = Awaited<ReturnType<typeof getSetsQuery>>[number]
export type Set = NonNullable<Awaited<ReturnType<typeof getSetQuery>>>
export type InsertSet = typeof setsTable.$inferInsert;
export type SelectSet = typeof setsTable.$inferSelect;
export type LikeResult = Extract<Awaited<ReturnType<typeof getLikers>>, { success: true }>['data']
export type SetInput = z.infer<typeof setFormSchema>



