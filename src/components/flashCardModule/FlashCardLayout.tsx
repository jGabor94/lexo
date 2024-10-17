"use client"

import useFlashCard from "@/lib/hooks/useFlashCard";
import { Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";
import SuccessButton from "./components/SuccessButton";
import UndoButton from "./components/UndoButton";
import WrongButton from "./components/WrongButton";
import FlashCard from "./flashcard";

const FlashCardLayout: FC<{}> = () => {

    const { terms, index, successItems, wrongItems } = useFlashCard()

    return (
        <Stack gap={2} sx={{
            width: 700, maxWidth: "100%"
        }} alignItems="center" >
            <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
            >
                <Chip color="warning" label={`${wrongItems.length}`} sx={{ pr: 2, pl: 2, fontWeight: 700 }} />
                <Typography>
                    {index < terms.length ? index + 1 : terms.length}/{terms.length}
                </Typography>
                <Chip color="primary" label={successItems.length} sx={{ pr: 2, pl: 2, fontWeight: 700 }} />
            </Stack>
            <FlashCard />
            <Stack direction="row" justifyContent="space-around" width="100%"
            >
                <WrongButton sx={{ color: "warning.main" }} />

                <UndoButton />
                <SuccessButton sx={{ color: "primary.main" }} />

            </Stack>
        </Stack >
    );
};

export default FlashCardLayout;
