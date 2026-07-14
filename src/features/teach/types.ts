import { DalSuccessReturn } from "@/lib/dal/types";
import z from "zod";
import { getStudentClassOverview, getStudentOverview, getTeacherOverview } from "./dal/queries";
import { getAttendedClassesQuery, getClassQuery, getInviteQuery, getSupervisedClassesQuery } from "./drizzle/operations";
import { classesTable, inviteTypeEnum, tasksTable } from "./drizzle/schema";
import { classFormSchema, inviteFormSchema, taskFormSchema } from "./zod/schema";

export type ClassInputs = z.infer<typeof classFormSchema>
export type InviteInputs = z.infer<ReturnType<typeof inviteFormSchema>>
export type TaskInputs = z.infer<typeof taskFormSchema>
export type InsertClass = typeof classesTable.$inferInsert;
export type InviteType = typeof inviteTypeEnum.enumValues[number];
export type SelectClass = typeof classesTable.$inferSelect;
export type ClassListItem = NonNullable<Awaited<ReturnType<typeof getSupervisedClassesQuery>>>[number]
export type StudentClassListItem = NonNullable<Awaited<ReturnType<typeof getAttendedClassesQuery>>>[number]
export type TeacherClassListItem = NonNullable<Awaited<ReturnType<typeof getSupervisedClassesQuery>>>[number]
export type StudentClassOverview = Extract<Awaited<ReturnType<typeof getStudentClassOverview>>, DalSuccessReturn<any>>["data"]
export type StudentOverview = Extract<Awaited<ReturnType<typeof getStudentOverview>>, DalSuccessReturn<any>>["data"]
export type TeacherOverview = Extract<Awaited<ReturnType<typeof getTeacherOverview>>, DalSuccessReturn<any>>["data"]
export type Class = NonNullable<Awaited<ReturnType<typeof getClassQuery>>>
export type Invite = NonNullable<Awaited<ReturnType<typeof getInviteQuery>>>
export type InsertTask = typeof tasksTable.$inferInsert;
export type SelectTask = typeof tasksTable.$inferSelect;
