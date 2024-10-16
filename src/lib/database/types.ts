import { SchemaTimestampsConfig, Types } from "mongoose";
import { LanguageCode } from "../assets/language_tools/types";
import { Acl } from "../services/authorization/types";
import { ExpandObject } from "../types/types";

export type ThemeMode = "light" | "dark"
export type NumberFormat = "symbol" | "scientific"

export interface ITerm {
    term: {
        content: string,
        lang: LanguageCode
    },
    definition: {
        content: [],
        lang: LanguageCode
    }
}

export interface UserConfig {
    theme: ThemeMode,
}

export interface PreferredLang {
    langCode: LanguageCode,
    name: string
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

export type Mongoose_Set = {
    _id: Types.ObjectId,
    user: Types.ObjectId,
    name: string,
    preferredTermLang: LanguageCode,
    preferredDefinitionLang: LanguageCode,
    acl: Acl,
} & ExpandObject<SchemaTimestampsConfig>

export type Mongoose_Term = {
    _id: Types.ObjectId,
    set: Types.ObjectId,
    acl: Acl
} & ExpandObject<SchemaTimestampsConfig & ITerm>

export type Mongoose_Progress = {
    _id: Types.ObjectId,
    term: Types.ObjectId,
    user: Types.ObjectId,
    status: 1 | 2 | 3 | 4 | 5,
    lastLearned: Date,
    acl: Acl
} & ExpandObject<SchemaTimestampsConfig>

export type Mongoose_Folder = {
    _id: Types.ObjectId,
    user: Types.ObjectId,
    name: string,
    sets: Types.ObjectId[],
    acl: Acl
} & ExpandObject<SchemaTimestampsConfig>

export type Mongoose_ChangeLog = {
    _id: Types.ObjectId,
    date: Date,
    description: string
} & ExpandObject<SchemaTimestampsConfig>

type Id_Serializable = { _id: string }
type User_Serializable<T> = T extends { user: infer U } ? { user: U } : { user: string };
type Sets_Serializable<T> = T extends { sets: infer U } ? { sets: U } : { sets: string[] };


export type Mongoose_User_Serializable = ExpandObject<Omit<Mongoose_User, "_id" | "currentTime" | "favoriteSets"> & Id_Serializable & { favoriteSets: string[] }>
export type Mongoose_Term_Serializable<T = {}> = ExpandObject<Omit<Mongoose_Term, "_id" | "currentTime"> & Id_Serializable & T>
export type Mongoose_ChangeLog_Serializable = ExpandObject<Omit<Mongoose_ChangeLog, "_id" | "currentTime"> & Id_Serializable>
export type Mongoose_Set_Serializable<T = {}> = ExpandObject<Omit<Mongoose_Set, "_id" | "currentTime" | keyof T | "user"> & User_Serializable<T> & Id_Serializable & T>
export type Mongoose_Folder_Serializable<T = {}> = ExpandObject<Omit<Mongoose_Folder, "_id" | "currentTime" | keyof T> & Id_Serializable & User_Serializable<T> & Sets_Serializable<T> & T>
export type Mongoose_Progress_Serializable = ExpandObject<Omit<Mongoose_Progress, "_id" | "currentTime"> & Id_Serializable>


