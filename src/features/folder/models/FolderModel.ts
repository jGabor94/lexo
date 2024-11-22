import schemaConfig from '@/database/schemaConfig'
import { Acl } from '@/features/authorization/types'
import { ExpandObject } from '@/types'
import mongoose, { Model, SchemaTimestampsConfig, Types } from 'mongoose'

export type Mongoose_Folder = {
    _id: Types.ObjectId,
    user: Types.ObjectId,
    name: string,
    sets: Types.ObjectId[],
    acl: Acl
} & ExpandObject<SchemaTimestampsConfig>

const folderSchema = new mongoose.Schema<Mongoose_Folder>({
    name: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }],
    acl: {}
}, schemaConfig)

export const Folder: Model<Mongoose_Folder> = mongoose.models.Folder || mongoose.model('Folder', folderSchema)
