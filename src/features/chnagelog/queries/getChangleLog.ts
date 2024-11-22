"use server"

import { dbConnect } from "@/database/dbConnect"
import { toSerializableObject } from "@/utils"
import { unstable_cache } from "next/cache"
import { ChangeLog as ChangeLogModel } from "../models/ChangeLogModel"
import { ChangeLog } from "../types"

export default unstable_cache(async () => {
    await dbConnect()
    const res = await ChangeLogModel.find().sort({ _id: -1 })
    return toSerializableObject<ChangeLog[]>(res)
}, ["changeLog"], { tags: ["changeLog"] })
