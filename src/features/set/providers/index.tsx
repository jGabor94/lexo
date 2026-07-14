"use client"

import { FC, ReactNode } from "react";
import { SWRConfig, unstable_serialize } from "swr";
import { Set } from "../types";

const SetProvider: FC<{ children: ReactNode, set: Set }> = ({ children, set }) => (
    <SWRConfig value={{ fallback: { [unstable_serialize(['set', set.id, set.task?.id])]: set } }}>
        {children}
    </SWRConfig>
);

export default SetProvider

