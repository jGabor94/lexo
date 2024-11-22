"use server"

import { dbConnect } from "@/database/dbConnect"
import { toSerializableObject } from "@/utils"
import mongoose from "mongoose"
import { Set as SetModel } from "../models/SetModel"
import { Set } from "../types"

const getSet = async (setid: mongoose.Types.ObjectId, userid: mongoose.Types.ObjectId) => {

    await dbConnect()

    const res = await SetModel.aggregate([
        { $match: { _id: setid } },
        {
            $lookup: {
                from: 'terms',
                localField: '_id',
                foreignField: 'set',
                as: 'terms',
                pipeline: [
                    {
                        $lookup: {
                            from: 'progresses',
                            localField: '_id',
                            foreignField: 'term',
                            as: 'progress',
                            pipeline: [
                                { $match: { user: userid } }

                            ]
                        }
                    },
                    { $set: { 'progress': { $first: '$progress' } } }
                ]
            }
        },

        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
            }
        },
        { $unwind: '$user' },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        "$$ROOT",
                        {
                            "user": {
                                _id: "$user._id",
                                name: "$user.name",
                                image: "$user.image",
                            }
                        }
                    ]
                }
            }
        },
        {
            $project: {
                sets: 0,
            }
        }
    ])

    return toSerializableObject<Set | null>(res[0] || null)

}

export default getSet