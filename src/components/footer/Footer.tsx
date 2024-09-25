import GitHubIcon from '@mui/icons-material/GitHub';
import { Divider, Link, Stack } from "@mui/material";
import { FC, Fragment } from "react";
import ChangeLog from "./components/changeLog/ChangeLog";
import PrivacyPolicy from "./components/PrivacyPolicy";

const Footer: FC<{}> = () => {
    return (
        <Fragment>
            <Divider sx={{ width: "100%" }} />
            <Stack direction="row" gap={2} justifyContent="center" p={4} flexWrap="wrap">
                <PrivacyPolicy />
                <Divider flexItem orientation="vertical" />
                <ChangeLog />
                <Divider flexItem orientation="vertical" />
                <Stack direction="row" gap={0.5} alignItems="center">
                    <GitHubIcon sx={{ width: 20 }} />
                    <Link href="https://github.com/jGabor94/lexo" sx={{ textDecoration: "none" }}>Source code</Link>
                </Stack>
            </Stack>
        </Fragment>

    )
}

export default Footer