import { MainMenu } from "@/components/menuBar";
import { Box } from "@mui/material";
import { FC, Fragment, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Fragment>
            <MainMenu height={60} />
            <Box sx={{ width: 1100, maxWidth: "100%", margin: "0 auto", mt: 4, mb: 4 }} >
                {children}
            </Box>
        </Fragment>
    );
}

export default Layout