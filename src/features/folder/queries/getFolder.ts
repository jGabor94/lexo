"use server"

import { dbConnect } from "@/database/dbConnect"
import { toSerializableObject } from "@/utils"
import mongoose from "mongoose"
import { Folder as FolderModel } from "../models/FolderModel"
import { Folder } from "../types"

const getFolder = async (folderid: mongoose.Types.ObjectId) => {

    await dbConnect()

    const res = await FolderModel.aggregate([
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