import GoogleSignInButton from "@/components/ui/GoogleSignInButton";
import { AnimatedLogo } from "@/components/ui/logo";
import { Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";

const Page: FC<{}> = () => {
    return (
        <Fragment>
            <Stack sx={{ width: "100%", height: "80vh", position: "relative" }} alignItems="center" justifyContent="center" gap={3} p={2}>
                <AnimatedLogo />
                <Typography sx={{ textAlign: "center" }}>
                    Create your own collections and practice them through different tasks.
                </Typography>
                <GoogleSignInButton />
            </Stack>
        </Fragment>
    )
}

export default Page