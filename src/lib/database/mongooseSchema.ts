import mongoose, { Schema } from 'mongoose';
import { languageCodes } from '../data/languages';
import { Mongoose_Account, Mongoose_ChangeLog, Mongoose_Folder, Mongoose_Progress, Mongoose_Set, Mongoose_Term, Mongoose_User } from './types';

const mongooseLanguageCodeEnum = {
    type: String,
    enum: languageCodes
}

const mongoosePreferredLang = {
    langCode: mongooseLanguageCodeEnum,
    name: String
}

const progressStatusEnum = {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5]
}

const schemaConfig = { timestamps: true, versionKey: false }

export const userSchema: Schema = new mongoose.Schema<Mongoose_User>({
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


export const accountSchema = new mongoose.Schema<Mongoose_Account>({
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

export const setSchema = new mongoose.Schema<Mongoose_Set>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    preferredTermLang: mongooseLanguageCodeEnum,
    preferredDefinitionLang: mongooseLanguageCodeEnum,
    acl: {}
}, schemaConfig)

export const termSchema = new mongoose.Schema<Mongoose_Term>({
    set: { type: mongoose.Schema.Types.ObjectId, ref: 'Set' },
    term: {
        content: String,
        lang: mongooseLanguageCodeEnum
    },
    definition: {
        content: [String],
        lang: mongooseLanguageCodeEnum
    },
    acl: {}
}, schemaConfig)

export const progressSchema = new mongoose.Schema<Mongoose_Progress>({
    term: { type: mongoose.Schema.Types.ObjectId, ref: 'Term' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: progressStatusEnum,
    lastLearned: Date,
    acl: {}
}, schemaConfig)


export const folderSchema = new mongoose.Schema<Mongoose_Folder>({
    name: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }],
    acl: {}
}, schemaConfig)

export const changeLogSchema = new mongoose.Schema<Mongoose_ChangeLog>({
    date: {
        type: Date,
        default: () => new Date(Date.now())
    },
    description: String,
}, schemaConfig)



