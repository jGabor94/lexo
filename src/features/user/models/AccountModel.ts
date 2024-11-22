import mongoose, { Model, SchemaTimestampsConfig, Types } from 'mongoose'
import { ExpandObject } from '../../../types'

export type Mongoose_Account = {
    _id: Types.ObjectId,
    userId: string,
    type: string,
    provider: string,
    providerAccountId: string,
    refresh_token: string,
    access_token: string,
    expires_at: number,
    token_type: string,
    scope: string,
    id_token: string,
    session_state: string,
} & ExpandObject<SchemaTimestampsConfig>

const accountSchema = new mongoose.Schema<Mongoose_Account>({
    userId: String,
    type: String,
    provider: String,
    providerAccountId: String,
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,
})

export const Account: Model<Mongoose_Account> = mongoose.models.Account || mongoose.model<Mongoose_Account>('Account', accountSchema)
