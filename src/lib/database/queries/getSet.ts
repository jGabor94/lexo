"use server"

import { toSerializableObject } from "@/lib/assets/general"
import mongoose from "mongoose"
import { dbConnect } from "../dbConnect"
import { Set } from "../models"
import { Mongoose_Progress_Serializable, Mongoose_Set_Serializable, Mongoose_Term_Serializable } from "../types"

export type Set = Mongoose_Set_Serializable<{
    terms: Array<Mongoose_Term_Serializable<{ progress: Mongoose_Progress_Serializable }>>,
    user: { _id: string, name: string, image: string }
}>

const getSet = async (setid: mongoose.Types.ObjectId, userid: mongoose.Types.ObjectId) => {

    await dbConnect()

    const res = await Set.aggregate([
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
                            pipeline: [{ $match: { user: userid } }]
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