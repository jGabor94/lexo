import { Dayjs } from "dayjs";
import { changeLogsTable } from "./drizzle/schema";

export type ChangeLogInput = { description: string, date: Dayjs }

export type InsertChangeLog = typeof changeLogsTable.$inferInsert;
export type SelectChangeLog = typeof changeLogsTable.$inferSelect;