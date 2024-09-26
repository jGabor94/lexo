import { createContext } from "react";
import { IAlertContext, IConfigContext } from "./types";

export const ConfigContext = createContext<IConfigContext>({} as IConfigContext);
export const AlertContext = createContext<IAlertContext>({} as IAlertContext);

