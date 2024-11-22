import { ExpandObject } from "@/types";
import { Dayjs } from "dayjs";
import { Mongoose_ChangeLog } from "./models/ChangeLogModel";

export type ChangeLogRaw = Omit<Mongoose_ChangeLog, "_id" | "currentTime"> & { _id: string }
export type ChangeLog = ExpandObject<ChangeLogRaw>
export type ChangeLogInput = { description: string, date: Dayjs }
