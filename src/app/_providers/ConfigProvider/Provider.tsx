"use client"

import { FC, ReactNode } from "react";
import { ConfigContext } from "../Context/context";
import { UserConfig } from "@/lib/database/types";


const Provider: FC<{ children: ReactNode, config: UserConfig }> = ({ children, config }) => {
    return (
        <ConfigContext.Provider value={{ theme: config.theme }}>
            {children}
        </ConfigContext.Provider>
    );
};

export default Provider