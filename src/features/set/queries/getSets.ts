"use server"

import { toSerializableObject } from "@/utils"
import { dbConnect } from "../../../database/dbConnect"
import { Set } from "../models/SetModel"
import { SetListItem } from "../types"

export default async (pipeline: any[]) => {

    await dbConnect()

    const res = await Set.aggregate([
        ...pipeline,
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        { $unwind: '$user' },
        {
            $lookup: {
                from: 'terms',
                localField: '_id',
                foreignField: 'set',
                as: 'terms'
            }
        },
        { $addFields: { termsCount: { $size: '$terms' } } },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        "$$ROOT",
                        {
                            "user": {
                                name: "$user.name",
                                image: "$user.image",
                            }
                        }
                    ]
                }
            }
        },
        { $project: { terms: 0 } }
    ])

    return toSerializableObject<SetListItem[]>(res)

}