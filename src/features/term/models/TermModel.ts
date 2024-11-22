import { languageCodes } from "@/constants/languages"
import schemaConfig from "@/database/schemaConfig"
import { Acl } from "@/features/authorization/types"
import { ExpandObject } from "@/types"
import mongoose, { Model, SchemaTimestampsConfig, Types } from 'mongoose'
import { TermInput } from "../types"

export type Mongoose_Term = {
    _id: Types.ObjectId,
    set: Types.ObjectId,
    acl: Acl
} & ExpandObject<SchemaTimestampsConfig & TermInput>

const termSchema = new mongoose.Schema<Mongoose_Term>({
    set: { type: mongoose.Schema.Types.ObjectId, ref: 'Set' },
    term: {
        content: String,
        lang: {
            type: String,
            enum: languageCodes
        }
    },
    definition: {
        content: [String],
        lang: {
            type: String,
            enum: languageCodes
        }
    },
    acl: {}
}, schemaConfig)

export const Term: Model<Mongoose_Term> = mongoose.models.Term || mongoose.model('Term', termSchema)
