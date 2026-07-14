"use client"

import { Box, Button, ButtonProps, Stack } from "@mui/material";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

interface GoogleSignInButtonProps extends ButtonProps {
    redirect?: string;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ redirect, ...buttonProps }) => {
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('redirect') || redirect

    return (
        <Button variant="outlined" color="button" {...buttonProps} onClick={async () => signIn("google", { redirect: true, redirectTo: redirectPath || "/home" })} >
            <Stack direction="row" alignItems="center" gap={1}>
                <Box component="img" src="/googleButtonLogo.svg" sx={{ width: 25 }} />
                Google Bejelentkezés
            </Stack>
        </Button>
    )
}


export default GoogleSignInButton