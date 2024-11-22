import { languageCodes } from '@/constants/languages'
import schemaConfig from '@/database/schemaConfig'
import { Acl } from '@/features/authorization/types'
import { LanguageCode } from '@/lib/language_tools/types'
import { ExpandObject } from '@/types'
import mongoose, { Model, SchemaTimestampsConfig, Types } from 'mongoose'

export type Mongoose_Set = {
    _id: Types.ObjectId,
    user: Types.ObjectId,
    name: string,
    preferredTermLang: LanguageCode,
    preferredDefinitionLang: LanguageCode,
    acl: Acl,
} & ExpandObject<SchemaTimestampsConfig>

const mongooseLanguageCodeEnum = {
    type: String,
    enum: languageCodes
}

const setSchema = new mongoose.Schema<Mongoose_Set>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    preferredTermLang: mongooseLanguageCodeEnum,
    preferredDefinitionLang: mongooseLanguageCodeEnum,
    acl: {}
}, schemaConfig)

export const Set: Model<Mongoose_Set> = mongoose.models.Set || mongoose.model('Set', setSchema)
