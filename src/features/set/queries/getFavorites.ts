"use server"

import { dbConnect } from "@/database/dbConnect"
import { User } from "@/features/user/models/UserModel"
import { toSerializableObject } from "@/utils"
import { SetListItem } from "../types"

export default async (pipeline: any[]) => {

    await dbConnect()

    const res = await User.aggregate([
        ...pipeline,
        {
            $lookup: {
                from: 'sets',
                localField: 'favoriteSets',
                foreignField: '_id',
                as: 'favoriteSets',
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'user',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    { $unwind: "$user" },
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
                ]
            }
        },
        { $sort: { createdAt: -1 } },
        { $project: { "favoriteSets.sets": 0 } }
    ])

    return toSerializableObject<SetListItem[]>(res[0].favoriteSets)

}

