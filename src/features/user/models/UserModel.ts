import schemaConfig from '@/database/schemaConfig'
import { ExpandObject } from '@/types'
import mongoose, { Model, Schema, SchemaTimestampsConfig, Types } from 'mongoose'

export type ThemeMode = "light" | "dark"

export interface UserConfig {
    theme: ThemeMode,
}

export type Mongoose_User = {
    _id: Types.ObjectId,
    username: string,
    password: string,
    email: string,
    name: string,
    roles: any[],
    config: UserConfig,
    emailVerified: Date | null,
    image: string,
    favoriteSets: Array<Types.ObjectId>
} & ExpandObject<SchemaTimestampsConfig>

const userSchema: Schema = new mongoose.Schema<Mongoose_User>({
    username: String,
    password: { type: String, default: "" },
    email: String,
    name: { type: String, default: "" },
    emailVerified: { type: Date, default: null },
    roles: [],
    image: { type: String, default: "" },
    config: {
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        },
    },
    favoriteSets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }]
}, schemaConfig)

export const User: Model<Mongoose_User> = mongoose.models.User || mongoose.model<Mongoose_User>('User', userSchema)
