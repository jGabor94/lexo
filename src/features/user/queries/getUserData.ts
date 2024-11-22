"use server"

import { dbConnect } from "@/database/dbConnect"
import { toSerializableObject } from "@/utils"
import mongoose from "mongoose"
import { User as UserModel } from "../models/UserModel"
import { User } from "../types"

const getUserData = async (userid: mongoose.Types.ObjectId) => {

    await dbConnect()

    const res = await UserModel.aggregate([
        { $match: { _id: userid } },
        { $project: { password: 0 } }
    ])

    return toSerializableObject<User | null>(res[0] || null)

}

export default getUserData