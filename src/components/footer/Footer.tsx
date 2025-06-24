import { Divider, Link, Stack, Typography } from "@mui/material";
import { Github } from "lucide-react";
import { FC, Fragment } from "react";
import ChangeLog from "../../features/changelog/components/ChangeLog";
import PrivacyPolicy from "./components/PrivacyPolicy";

const Footer: FC<{}> = () => {
    return (
        <Fragment>
            <Stack alignItems="center" sx={{ py: 4, color: "white", background: "linear-gradient(90deg, #3CC8AF 0%, #3CC8F4 100%)" }}>
                <Stack gap={1} alignItems="center">
                    <Stack direction="row" gap={2} justifyContent="center" flexWrap="wrap">
                        <PrivacyPolicy />
                        -
                        <ChangeLog />
                        -
                        <Stack direction="row" gap={0.5} alignItems="center">
                            <Github color="#ffffff" size={20} />
                            <Link href="https://github.com/jGabor94/lexo" sx={{ textDecoration: "none", fontWeight: 500 }}>Forrráskód</Link>
                        </Stack>
                    </Stack>
                    <Divider flexItem sx={{ background: "white" }} />
                    <Typography fontSize={13} sx={{ fontWeight: 500 }}> v0.1.0 (Alpha)</Typography>
                </Stack>

            </Stack>

        </Fragment >

    )
}

export default Footer