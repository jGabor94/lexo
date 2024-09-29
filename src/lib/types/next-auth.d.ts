import "next-auth";
import "next-auth/jwt";
import { Mongoose_User } from "../database/types";
import { Email } from "./types";

interface TokenUserData {
    _id: string,
    username: string,
    roles: any[],
    email: string,
}


declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: TokenUserData
    }

    interface User extends Mongoose_User { }

}


declare module "next-auth" {
    interface AdapterUser {
        email: Email
    }
}


declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        userData?: TokenUserData
    }
}

