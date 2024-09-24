"use server"

import { toSerializableObject } from "@/lib/assets/general"
import mongoose from "mongoose"
import { dbConnect } from "../dbConnect"
import { Folder } from "../models"
import { Mongoose_Folder_Serializable } from "../types"
import { SetListItem } from "./getSets"

export type Folder = Mongoose_Folder_Serializable<{
    user: { name: string, image: string },
    sets: Array<SetListItem>
}>

const getFolder = async (folderid: mongoose.Types.ObjectId) => {

    await dbConnect()

    const res = await Folder.aggregate([
        { $match: { _id: folderid } },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $lookup: {
                from: 'sets',
                localField: 'sets',
                foreignField: '_id',
                as: 'sets',
                pipeline: [
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
                ]
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
                                name: "$user.name",
                                image: "$user.image"
                            }
                        }
                    ]
                }
            }
        },
    ])


    return toSerializableObject<Folder | null>(res[0] || null)

}

export default getFolder