"use server"

import { auth } from "@/lib/services/authentication/auth";
import { User } from "@/lib/database/models";
import { dbConnect } from "@/lib/database/dbConnect";
import React, { FC, ReactNode } from "react";
import { SWRProvider } from "../providers";
import { UserConfig } from "@/lib/database/types";



const ConfigProvider: FC<{ children: ReactNode }> = async ({ children }) => {

    const session = await auth()

    let config: UserConfig = { theme: "light" }

    if (session) {

        await dbConnect()
        const user = await User.findOne({ _id: session.user._id }).populate("config")
        if (user) config = user.toJSON().config
    }

    return (
        <SWRProvider value={{ fallback: { "userConfig": config } }}>
            {children}
        </SWRProvider>
    )
}

export default ConfigProvider

