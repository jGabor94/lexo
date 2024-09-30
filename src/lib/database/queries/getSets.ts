"use server"

import { toSerializableObject } from "@/lib/assets/general"
import { ExpandObject } from "@/lib/types/types"
import { unstable_cache } from "next/cache"
import { dbConnect } from "../dbConnect"
import { Set } from "../models"
import { Mongoose_Set_Serializable } from "../types"

export type SetListItem = ExpandObject<Mongoose_Set_Serializable<
    { user: { name: string, image: string }, termsCount: number }
>>

export default unstable_cache(async (pipeline: any[]) => {

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
        { $sort: { createdAt: -1 } },
        { $project: { terms: 0 } }
    ])

    return toSerializableObject<SetListItem[]>(res)

}, ["sets"], { tags: ["sets"], revalidate: 60 * 60 })