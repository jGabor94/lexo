import schemaConfig from '@/database/schemaConfig'
import { Acl } from '@/features/authorization/types'
import { ExpandObject } from '@/types'
import mongoose, { Model, SchemaTimestampsConfig, Types } from 'mongoose'


export type Mongoose_Progress = {
    _id: Types.ObjectId,
    term: Types.ObjectId,
    user: Types.ObjectId,
    status: 1 | 2 | 3 | 4 | 5,
    lastLearned: Date,
    acl: Acl
} & ExpandObject<SchemaTimestampsConfig>


const progressStatusEnum = {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5]
}

const progressSchema = new mongoose.Schema<Mongoose_Progress>({
    term: { type: mongoose.Schema.Types.ObjectId, ref: 'Term' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: progressStatusEnum,
    lastLearned: Date,
    acl: {}
}, schemaConfig)

export const Progress: Model<Mongoose_Progress> = mongoose.models.Progress || mongoose.model('Progress', progressSchema)
