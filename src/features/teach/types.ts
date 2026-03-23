import z from "zod";
import { getClassQuery, getOwnClassesQuery } from "./drizzle/operations";
import { classesTable } from "./drizzle/schema";
import { classFormSchema } from "./zod/schema";

export type ClassInputs = z.infer<typeof classFormSchema>
export type InsertClass = typeof classesTable.$inferInsert;
export type SelectClass = typeof classesTable.$inferSelect;
export type ClassListItem = NonNullable<Awaited<ReturnType<typeof getOwnClassesQuery>>>[number]
export type Class = NonNullable<Awaited<ReturnType<typeof getClassQuery>>>