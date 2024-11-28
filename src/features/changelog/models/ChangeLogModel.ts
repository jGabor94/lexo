import schemaConfig from '@/database/schemaConfig'
import { ExpandObject } from '@/types'
import mongoose, { Model, SchemaTimestampsConfig, Types } from 'mongoose'

export type Mongoose_ChangeLog = {
    _id: Types.ObjectId,
    date: Date,
    description: string
} & ExpandObject<SchemaTimestampsConfig>

export const changeLogSchema = new mongoose.Schema<Mongoose_ChangeLog>({
    date: {
        type: Date,
        default: () => new Date(Date.now())
    },
    description: String,
}, schemaConfig)

export const ChangeLog: Model<Mongoose_ChangeLog> = mongoose.models.ChangeLog || mongoose.model('ChangeLog', changeLogSchema)
