import { extractUsername } from "@/lib/assets/general";
import { dbConnect } from "@/lib/database/dbConnect";
import { Account, User } from "@/lib/database/models";
import { Email } from "@/lib/types/types";
import mongoose from "mongoose";
import { Adapter } from "next-auth/adapters";

export const mongooseAdapter: Adapter = {
    async createUser(user) {
        const username = extractUsername(user.email as Email)
        await dbConnect()
        console.log(user)
        const newUser = await User.create({
            username,
            email: user.email,
            name: user.name,
            roles: ["user", username],
            image: user.image,
            emailVerified: user.emailVerified
        })

        return {
            ...newUser.toObject(),
            id: newUser._id.toString(),
        }
    },
    async getUser(id) {
        await dbConnect()
        const user = await User.findById(id).lean();
        if (user) {
            return {
                ...user,
                id: user._id.toString(),
            }
        }

        return null

    },
    async getUserByEmail(email) {
        await dbConnect()
        const user = await User.findOne({ email }).select({ password: 0 }).lean()
        if (user) {
            return {
                ...user,
                id: user._id.toString(),
            }
        }

        return null
    },
    async linkAccount(account) {
        await dbConnect()
        await Account.create(account)
        return account
    },
    async getUserByAccount({ providerAccountId, provider }) {

        await dbConnect()

        const account = await Account.findOne({ provider, providerAccountId })

        if (!account) return null;
        const user = await User.findById(new mongoose.mongo.ObjectId(account.userId)).lean();

        if (user) {
            return {
                ...user,
                id: user._id.toString(),
            }
        }

        return null
    }
}