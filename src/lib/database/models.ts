import mongoose, { Model } from 'mongoose';
import { accountSchema, changeLogSchema, folderSchema, progressSchema, setSchema, termSchema, userSchema } from './mongooseSchema';
import { Mongoose_Account, Mongoose_ChangeLog, Mongoose_Folder, Mongoose_Progress, Mongoose_Set, Mongoose_Term, Mongoose_User } from './types';


export const User: Model<Mongoose_User> = mongoose.models.User || mongoose.model<Mongoose_User>('User', userSchema)
export const Account: Model<Mongoose_Account> = mongoose.models.Account || mongoose.model<Mongoose_Account>('Account', accountSchema)
export const Set: Model<Mongoose_Set> = mongoose.models.Set || mongoose.model('Set', setSchema)
export const Term: Model<Mongoose_Term> = mongoose.models.Term || mongoose.model('Term', termSchema)
export const Folder: Model<Mongoose_Folder> = mongoose.models.Folder || mongoose.model('Folder', folderSchema)
export const ChangeLog: Model<Mongoose_ChangeLog> = mongoose.models.ChangeLog || mongoose.model('ChangeLog', changeLogSchema)
export const Progress: Model<Mongoose_Progress> = mongoose.models.Progress || mongoose.model('Progress', progressSchema)


