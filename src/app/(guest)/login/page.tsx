import GoogleSignInButton from "@/components/ui/GoogleSignInButton";
import { AnimatedLogo } from "@/components/ui/logo";
import { Divider, Stack, Typography } from "@mui/material";
import { env } from "process";
import { FC, Fragment } from "react";
import CredentialsSingIn from "../../../components/CredentialsSingIn";

const Page: FC<{}> = () => {
    return (
        <Fragment>
            <Stack sx={{ width: "100%", height: "80vh", position: "relative" }} alignItems="center" justifyContent="center" gap={3} p={2}>
                <AnimatedLogo />
                <Typography sx={{ textAlign: "center" }}>
                    Create your own collections and practice them through different tasks.
                </Typography>
                <Stack sx={{ width: 300, maxWidth: "100%", gap: 3 }}>
                    <GoogleSignInButton />
                    {env.NODE_ENV === "development" && (
                        <Fragment>
                            <Divider flexItem>or</Divider>
                            <CredentialsSingIn />
                        </Fragment>
                    )}
                </Stack>

            </Stack>
        </Fragment>
    )
}

export default Page