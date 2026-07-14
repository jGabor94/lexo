import { LogoWhite } from "@/components/ui/logo/Logo";
import LoginForm from "@/features/authentication/components/LoginForm";
import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

export const dynamic = "force-static"

const Page: FC<{}> = async () => {
    return (

        <Stack sx={{
            height: "100vh", width: "100vw",
            flexDirection: { xs: "column", md: "row" },
        }}>
            <Stack sx={{ flex: 0.5, background: "linear-gradient(90deg, #3CC8AF 0%, #3CC8F4 100%)", position: "relative", justifyContent: "center", overflow: "hidden" }}>
                <LogoWhite sx={{ position: "absolute", left: 30, top: 20 }} />
                <Box component={"img"} src="/cat_laptop.png" width={160} sx={{ position: "absolute", right: -50, bottom: { xs: -50, md: undefined }, width: { xs: 300, md: 500 }, zIndex: 10 }} />

            </Stack>

            <Stack sx={{ width: "100%", position: "relative", flex: 0.5, zIndex: 1000000, backgroundColor: "background.default" }} alignItems="center" justifyContent="center" gap={3} p={2}>
                <Typography sx={{ textAlign: "center", fontSize: 40, fontWeight: 600 }}>
                    Bejelentkezés
                </Typography>
                <LoginForm />
            </Stack>
        </Stack>


    )
}

export default Page