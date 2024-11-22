import { Mongoose_User } from "./models/UserModel";

export type UserRaw = Omit<Mongoose_User, "_id" | "currentTime" | "favoriteSets"> & { _id: string } & { favoriteSets: string[] }
export type User = Omit<UserRaw, "password">