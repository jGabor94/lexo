import { dbConnect } from "@/lib/database/dbConnect"
import { User } from "@/lib/database/models"
import { mongooseAdapter } from "@/lib/services/authentication/NextAuth_adapter"
import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { authConfig } from "./auth.config"

export const { handlers: { GET, POST }, auth, signIn, signOut, unstable_update } = NextAuth({
    ...authConfig,
    adapter: mongooseAdapter as any,
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
                await dbConnect()

                const user = await User.findOne({ email: credentials.email })

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
                return { ...token, userData: { ...session.user } }
            }

            if (userData) return { ...token, userData: { _id: userData.id || userData._id, username: userData.username, roles: userData.roles, email: userData.email } }
            return token
        },

        session: async ({ session, token }) => {
            return { ...session, user: { ...session.user, ...token.userData } }
        },

    },
})
