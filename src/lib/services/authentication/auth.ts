import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
import { mongooseAdapter } from "@/lib/services/authentication/NextAuth_adapter"
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
    ],
    callbacks: {
        jwt: async ({ token, user, profile, trigger, session }) => {

            let userData = user

            if (trigger === "update" && session) {
                return { ...token, userData: { ...session.user } }
            }

            if (userData) return { ...token, userData: { _id: userData.id, username: userData.username, roles: userData.roles, image: profile ? profile.picture : token.image, email: userData.email, name: userData.name } }
            return token
        },

        session: async ({ session, token }) => {
            return { ...session, user: { ...session.user, ...token.userData } }
        },

    },
})
