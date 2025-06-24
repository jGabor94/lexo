import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

const protectedRoutes = [
    "/home",
    "/library",
    "/folders"
]

export const authConfig = {
    providers: [],
    callbacks: {
        authorized({ auth, request }) {

            if (protectedRoutes.some(path => request.nextUrl.pathname.startsWith(path))) {
                if (!auth) {
                    return NextResponse.redirect(new URL('/login', request.url))
                }
            }


            if (auth && request.nextUrl.pathname === "/") {
                return NextResponse.redirect(new URL('/home', request.url))
            }


            return true
        },
    }


} satisfies NextAuthConfig;
