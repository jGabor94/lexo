import { createContext } from "react";
import { IAlertContext, IColorModeContext, IConfigContext } from "./types";

export const ColorModeContext = createContext<IColorModeContext>({} as IColorModeContext);
export const ConfigContext = createContext<IConfigContext>({} as IConfigContext);
export const AlertContext = createContext<IAlertContext>({} as IAlertContext);
