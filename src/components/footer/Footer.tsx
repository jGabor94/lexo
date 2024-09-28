import GitHubIcon from '@mui/icons-material/GitHub';
import { Divider, Link, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import ChangeLog from "./components/changeLog/ChangeLog";
import PrivacyPolicy from "./components/PrivacyPolicy";

const Footer: FC<{}> = () => {
    return (
        <Fragment>
            <Divider sx={{ width: "100%", mb: 3 }} />
            <Stack alignItems="center">
                <Stack gap={1} alignItems="center">
                    <Stack direction="row" gap={2} justifyContent="center" flexWrap="wrap">
                        <PrivacyPolicy />
                        -
                        <ChangeLog />
                        -
                        <Stack direction="row" gap={0.5} alignItems="center">
                            <GitHubIcon sx={{ width: 20 }} />
                            <Link href="https://github.com/jGabor94/lexo" sx={{ textDecoration: "none" }}>Source code</Link>
                        </Stack>
                    </Stack>
                    <Divider flexItem />
                    <Typography fontSize={13}> v0.1.0 (Alpha)</Typography>
                </Stack>

            </Stack>

        </Fragment >

    )
}

export default Footer