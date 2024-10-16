"use client";

import FlashCardMain from "@/components/flashCardModule/FlashCardMain";
import useSet from "@/lib/hooks/useSet";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";


const Page: FC<{ params: { mode: "free" | "progress", setid: string } }> = ({ params: { mode } }) => {

    const { set } = useSet()

    return (
        <Box sx={{ margin: "0 auto" }}>
            <Paper variant="elevation" component={Stack} p={1} height={40} sx={{ position: "relative" }} direction="row" alignItems="center" justifyContent="center" gap={1} mt={-2} mb={2}>
                <Typography sx={{ position: "absolute", left: 16 }} >{set.name}</Typography>
                {mode && (<Typography >{mode} mode</Typography>)}
                <Tooltip title="close" sx={{ position: "absolute", right: 2 }}>
                    <IconButton component={Link} href={`/sets/${set._id}/flashcards`}>
                        <CloseOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
            <FlashCardMain mode={mode} />
        </Box>
    )

};

export default Page;
