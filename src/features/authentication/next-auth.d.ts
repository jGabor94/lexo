import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";
import { DefaultJWT } from "next-auth/jwt";
import { SelectUser } from "../user/types";

interface TokenUserData {
    id: string,
    username: string,
    roles: string[],
    email: string,
}

declare module "next-auth" {
    interface Session extends DefaultSession { user: TokenUserData }
    interface User extends Omit<SelectUser, "password"> { }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT { userData: TokenUserData }
}

