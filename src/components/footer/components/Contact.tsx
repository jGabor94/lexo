import { Stack, Typography, } from "@mui/material";
import { Mail, MapPin, Phone } from 'lucide-react';
import { FC } from "react";

const Contact: FC<{}> = () => {
    return (
        <Stack gap={0.5}>
            <Stack direction="row" gap={1}>
                <Mail />
                <Typography>jakucs.gabor94@gmail.com</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
                <MapPin />
                <Typography>5510 Dévaványa Deák utca 12/1</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
                <Phone />
                <Typography>+36306394253</Typography>
            </Stack>
        </Stack>
    )
}

export default Contact