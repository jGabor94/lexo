"use client"

import { Box, Skeleton, Stack } from "@mui/material";
import type { } from '@mui/material/themeCssVarsAugmentation';
import { FC } from "react";
import TextLine from "../ui/TextLine";

const HorizontalListSkeleton: FC<{}> = () => (
    <Box sx={(theme) => ({
        position: "relative",
        "&::after": {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: 150,
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            boxShadow: `inset -120px 0px 50px -38px ${theme.vars.palette.background.default}`
        },
    })}>
        <Stack gap={3}>
            <TextLine>
                <Stack direction="row" gap={1}>
                    <Skeleton variant="circular" width={25} height={25} />
                    <Skeleton variant="text" width={120} />
                </Stack>
            </TextLine>
            <Stack direction="row" gap={3} sx={{ overflowX: "hidden", width: "100%" }}>
                {[...Array(10)].map((_, index) => (
                    <Skeleton key={index} variant="rounded" width={300} height={150} sx={{ borderRadius: "10px", flexGrow: 1, minWidth: 300 }} />
                ))}
            </Stack>
        </Stack>
    </Box>


)

export default HorizontalListSkeleton
