import GoogleSignInButton from "@/components/ui/GoogleSignInButton";
import Logo from "@/components/ui/Logo";
import { SparklesCore } from "@/components/ui/Sparkles";
import { Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";

const Page: FC<{}> = () => {
    return (
        <Fragment>
            <Stack sx={{ width: "100%", height: "80vh", position: "relative" }} alignItems="center" justifyContent="center" gap={3} p={2}>
                <Stack alignItems="center">
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                    <Logo fontSize={50} />
                </Stack>
                <Typography sx={{ textAlign: "center" }}>
                    Create your own collections and practice them through different tasks.
                </Typography>
                <GoogleSignInButton />
            </Stack>
        </Fragment>
    )
}

export default Page