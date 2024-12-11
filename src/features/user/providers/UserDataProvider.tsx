"use server"

import { auth } from "@/features/authentication/lib/auth";
import { SWRProvider } from "@/providers";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import getUserData from "../queries/getUserData";

const UserDataProvider: FC<{ children: ReactNode }> = async ({ children }) => {

    const session = await auth()

    if (session) {
        const user = await getUserData(session.user.id)
        if (user) {
            return (
                <SWRProvider value={{ fallback: { 'userData': user } }}>
                    {children}
                </SWRProvider>
            )
        }
        redirect("/login")
    }
    redirect("/login")
}

export default UserDataProvider

