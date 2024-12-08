import { db } from "@/drizzle/db";
import { accounts, users } from "@/drizzle/schema";
import { extractUsername } from "@/features/user/utils";
import { and, eq, getTableColumns } from "drizzle-orm";
import { Adapter } from "next-auth/adapters";
import { Email } from "../types";

export const customAdapter: Adapter = {
    async createUser(user) {
        const username = extractUsername(user.email as Email)
        const [createdUser] = await db.insert(users).values({
            username: username,
            email: user.email,
            name: user.name || "",
            roles: ["user", username],
            image: user.image || "",
            emailVerified: user.emailVerified
        }).returning();

        return createdUser
    },
    async getUser(id) {
        const [user] = await db.select().from(users).where(eq(users.id, id))

        if (user) return user
        return null
    },
    async getUserByEmail(email) {
        const { password, ...userColumns } = getTableColumns(users)
        const [user] = await db.select(userColumns).from(users).where(eq(users.email, email))

        if (user) return user
        return null
    },
    async linkAccount(account) {
        await db.insert(accounts).values(account)
        return account
    },
    async getUserByAccount({ providerAccountId, provider }) {

        const [account] = await db.select().from(accounts).where(and(eq(accounts.provider, provider), eq(accounts.providerAccountId, providerAccountId)))
        console.log({ account })
        if (!account) return null;

        const { password, ...userColumns } = getTableColumns(users)
        const [user] = await db.select(userColumns).from(users).where(eq(users.id, account.userId))

        if (user) return user


        return null
    }
}