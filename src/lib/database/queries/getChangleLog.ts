"use server"

import { toSerializableObject } from "@/lib/assets/general"
import { unstable_cache } from "next/cache"
import { dbConnect } from "../dbConnect"
import { ChangeLog, } from "../models"
import { Mongoose_ChangeLog_Serializable } from "../types"

export type ChangeLogListItem = Mongoose_ChangeLog_Serializable

export default unstable_cache(async () => {
    await dbConnect()
    const res = await ChangeLog.find().sort({ _id: -1 })
    return toSerializableObject<ChangeLogListItem[]>(res)
}, ["changeLog"], { tags: ["changeLog"] })
