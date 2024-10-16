import { MainMenu } from "@/components/menuBar";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import UserDataProvider from "../_providers/ConfigProvider/UserDataProvider";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <UserDataProvider>
            <MainMenu height={60} />
            <Box sx={{
                width: 1100, maxWidth: "98%", margin: "0 auto", mt: 4, mb: 4
            }} >
                {children}
            </Box>
        </UserDataProvider>
    );
}

export default Layout