"use client";

import FlashCardMain from "@/features/flashcard/components/FlashCardMain";
import { FlashCardMode } from "@/features/flashcard/types";
import useSet from "@/features/set/hooks/useSet";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Paper, Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";


const Page: FC<{ params: { mode: FlashCardMode, setid: string } }> = ({ params: { mode } }) => {

    const { set } = useSet()

    return (
        <Stack sx={{ margin: "0 auto", gap: 2 }} >
            <Paper variant="elevation" component={Stack} p={1} pl={2} pr={2} mt={-2} direction="row" alignItems="center" justifyContent="space-between">
                <Typography>{set.name}</Typography>
                <Tooltip title="close" >
                    <Link href={`/sets/${set._id}/flashcards`} legacyBehavior>
                        <CloseOutlinedIcon sx={{ cursor: "pointer" }} />
                    </Link>
                </Tooltip>
            </Paper>
            <FlashCardMain mode={mode} />
        </Stack>
    )

};

export default Page;
