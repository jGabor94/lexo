"use server"

import { toSerializableObject } from "@/lib/assets/general"
import mongoose from "mongoose"
import { dbConnect } from "../dbConnect"
import { User } from "../models"
import { Mongoose_User_Serializable } from "../types"

export type User = Omit<Mongoose_User_Serializable, "password">

const getUserData = async (userid: mongoose.Types.ObjectId) => {

    await dbConnect()

    const res = await User.aggregate([
        { $match: { _id: userid } },
        { $project: { password: 0 } }
    ])

    return toSerializableObject<User | null>(res[0] || null)

}

export default getUserData