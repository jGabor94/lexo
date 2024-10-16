"use server"

import { toSerializableObject } from "@/lib/assets/general"
import mongoose from "mongoose"
import { dbConnect } from "../dbConnect"
import { Folder } from "../models"
import { Mongoose_Folder_Serializable } from "../types"

export type FolderListItem = Mongoose_Folder_Serializable<{ setsCount: number }>

export default async (userid: mongoose.Types.ObjectId) => {

    await dbConnect()

    const res = await Folder.aggregate([
        { $match: { user: userid } },
        { $addFields: { setsCount: { $size: '$sets' } } },
        { $sort: { createdAt: -1 } },
    ])

    return toSerializableObject<FolderListItem[]>(res)

}
