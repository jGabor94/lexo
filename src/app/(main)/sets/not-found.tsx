import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";


const NotFound: FC<{}> = () => {

    return (
        <Stack alignItems="center" justifyContent="center" gap={1} height={400} >
            <Stack direction="row" gap={1} alignItems="center" >
                < Typography color="primary.main" sx={{
                    fontSize: 40,
                    background: "linear-gradient(90deg, #3CC8AF 0%, #3CC8F4 100%)",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                }
                }> 404 </Typography>
            </Stack>

            < Typography fontSize={17} > Sajnos a kért oldal nem található 🙁</Typography>
            <Button variant="outlined" href="/">Irány a főoldal</Button>
        </Stack>
    )
}

export default NotFound