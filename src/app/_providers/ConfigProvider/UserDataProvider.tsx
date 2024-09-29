"use server"

import { createObjectId } from "@/lib/assets/general";
import { dbConnect } from "@/lib/database/dbConnect";
import getUserData from "@/lib/database/queries/getUserData";
import { auth } from "@/lib/services/authentication/auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import { SWRProvider } from "../providers";

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

