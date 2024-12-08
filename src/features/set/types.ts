import { setsTable } from "@/drizzle/schema";
import getSet from "./queries/getSet";
import getSets from "./queries/getSets";

export type SetListItem = Awaited<ReturnType<typeof getSets>>[number]
export type Set = NonNullable<Awaited<ReturnType<typeof getSet>>>

export type InsertSet = typeof setsTable.$inferInsert;
export type SelectSet = typeof setsTable.$inferSelect;





