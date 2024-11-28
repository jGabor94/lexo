import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";
import { SelectUser } from "../user/types";

interface TokenUserData {
    id: string,
    username: string,
    roles: any[],
    email: string,
}


declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: TokenUserData
    }

    interface User extends Omit<SelectUser, "password"> { }
    interface AdapterUser extends Omit<SelectUser, "password"> { }

}




declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        userData: TokenUserData
    }
}

