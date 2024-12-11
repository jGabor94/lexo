import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const changeLogsTable = pgTable("changelogs", {
    id: uuid("id").primaryKey().defaultRandom(),
    description: text("description").notNull(),
    date: timestamp("date", { withTimezone: true }).notNull().defaultNow(),
    createdAt,
    updatedAt,
});
