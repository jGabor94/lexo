"use server"

import { dbConnect } from "@/database/dbConnect";
import { SWRProvider } from "@/providers";
import { createObjectId } from "@/utils";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import getUserData from "../queries/getUserData";
import { auth } from "@/features/authentication/lib/auth";

const UserDataProvider: FC<{ children: ReactNode }> = async ({ children }) => {

    const session = await auth()

    if (session) {
        await dbConnect()
        const user = await getUserData(createObjectId(session.user._id))
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

