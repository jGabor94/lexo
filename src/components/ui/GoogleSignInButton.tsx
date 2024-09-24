"use client"

import SA_googleSignIn from "@/lib/actions/user/googleSignIn";
import { Box, Button, ButtonProps, Stack } from "@mui/material";
import { FC } from "react";

const GoogleSignInButton: FC<ButtonProps> = (props) => {
    return (
        <Button variant="outlined" {...props} onClick={async () => await SA_googleSignIn()} >
            <Stack direction="row" alignItems="center" gap={1}>
                <Box component="img" src="/googleButtonLogo.svg" sx={{ width: 25 }} />
                Google Sign In
            </Stack>
        </Button>
    )
}

export default GoogleSignInButton