"use client"

import { Box, Button, ButtonProps, Stack } from "@mui/material";
import { signIn } from "next-auth/react";
import { FC } from "react";

const GoogleSignInButton: FC<ButtonProps> = (props) => (
    <Button variant="outlined" color="button" {...props} onClick={async () => signIn("google", { redirect: true, redirectTo: "/home" })} >
        <Stack direction="row" alignItems="center" gap={1}>
            <Box component="img" src="/googleButtonLogo.svg" sx={{ width: 25 }} />
            Google Bejelentkezés
        </Stack>
    </Button>
)


export default GoogleSignInButton