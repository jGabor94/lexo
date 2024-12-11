import { changeLogsTable } from "@/drizzle/schema";
import { Dayjs } from "dayjs";

export type ChangeLogInput = { description: string, date: Dayjs }

export type InsertChangeLog = typeof changeLogsTable.$inferInsert;
export type SelectChangeLog = typeof changeLogsTable.$inferSelect;