import { Term } from "../term/types";
import { Mongoose_Set } from "./models/SetModel";

export type SetRaw<T = {}> = Omit<Mongoose_Set, "_id" | "currentTime" | keyof T | "user"> & (T extends { user: infer U } ? { user: U } : { user: string }) & { _id: string } & T

export type Set = SetRaw<{
    terms: Array<Term>,
    user: { _id: string, name: string, image: string }
}>

export type SetListItem = SetRaw<
    { user: { name: string, image: string }, termsCount: number }
>