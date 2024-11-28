import { db } from "@/drizzle/db"
import { usersTable } from "@/drizzle/schema"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import NextAuth, { Session } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { authConfig } from "./auth.config"
import { customAdapter } from "./NextAuth_adapter"

export const { handlers: { GET, POST }, auth, signIn, signOut, unstable_update } = NextAuth({
    ...authConfig,
    adapter: customAdapter,
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const [user] = await db.select().from(usersTable).where(eq(usersTable.email, credentials.email as string))
                if (!user || !bcrypt.compareSync(credentials.password as string, user.password)) {
                    throw new Error("Invalid credential data")
                } else if (!user.emailVerified) {
                    return null
                } else {
                    return user
                }


            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user, profile, trigger, session }) => {

            let userData = user
            console.log({ userData })
            if (trigger === "update" && session) {
                console.log("flag")
                return { ...token, userData: { ...session.user } }
            }

            if (userData) return { ...token, userData: { id: userData.id, username: userData.username, roles: userData.roles, email: userData.email } }
            return token
        },

        session: async ({ session, token }) => {
            const asd: Session = { ...session, user: { ...session.user, ...token.userData } }
            console.log({ session })
            return { ...session, user: { ...session.user, ...token.userData } }
        },

    },
})
