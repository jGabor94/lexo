import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

const Contact: FC<{}> = () => {
    return (
        <Stack gap={0.5}>
            <Stack direction="row" gap={1}>
                <EmailIcon sx={{ color: "text.secondary" }} />
                <Typography>jakucs.gabor94@gmail.com</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
                <PlaceIcon sx={{ color: "text.secondary" }} />
                <Typography>5510 Dévaványa Deák utca 12/1</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
                <CallIcon sx={{ color: "text.secondary" }} />
                <Typography>+36306394253</Typography>
            </Stack>
        </Stack>
    )
}

export default Contact