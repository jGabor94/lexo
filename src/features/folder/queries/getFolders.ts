"use server"

import { dbConnect } from "@/database/dbConnect"
import { toSerializableObject } from "@/utils"
import mongoose from "mongoose"
import { Folder } from "../models/FolderModel"
import { FolderListItem } from "../types"

export default async (userid: mongoose.Types.ObjectId) => {

    await dbConnect()

    const res = await Folder.aggregate([
        { $match: { user: userid } },
        { $addFields: { setsCount: { $size: '$sets' } } },
        { $sort: { createdAt: -1 } },
    ])

    return toSerializableObject<FolderListItem[]>(res)

}
