"use client"

import { Chip, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { SquareArrowDown, SquareArrowLeft, SquareArrowRight, SquareArrowUp } from "lucide-react";
import { useParams } from "next/navigation";
import { FC } from "react";
import useExerciseController from "../../hooks/useExerciseController";
import { modeMap } from "../../lib/contants";
import { ExerciseMode } from "../../types";
import SuccessButton from "./components/SuccessButton";
import UndoButton from "./components/UndoButton";
import WrongButton from "./components/WrongButton";
import FlashCard from "./flashcard";

const FlashCardMain: FC<{}> = () => {

    const { terms, index, successItems, wrongItems } = useExerciseController()
    const { mode } = useParams<{ mode: ExerciseMode }>()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



    return (
        <Stack gap={2} sx={{ width: 700, maxWidth: "100%" }} alignItems="center" >
            <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
            >
                <Chip color="warning" label={`${wrongItems.length}`} sx={{ pr: 2, pl: 2, fontWeight: 700 }} />
                <Stack gap={0.5} alignItems="center">
                    <Typography>
                        {index < terms.length ? index + 1 : terms.length}/{terms.length}
                    </Typography>
                    <Typography fontSize={12}>
                        {modeMap[mode]}
                    </Typography>
                </Stack>

                <Chip color="primary" label={successItems.length} sx={{ pr: 2, pl: 2, fontWeight: 700 }} />
            </Stack>
            <FlashCard />
            <Stack direction="row" justifyContent="space-around" width="100%">
                <WrongButton style={{ color: theme.vars.palette.warning.main }} />
                <UndoButton />
                <SuccessButton style={{ color: theme.vars.palette.primary.main }} />
            </Stack>
            {!isMobile && (
                <Stack alignItems="center">
                    <Stack direction="row" alignItems="center" gap={1}>

                        {/* Bal oldal: szöveg + nyíl */}
                        <Stack direction="row" alignItems="center" gap={0.5}>
                            <Typography fontSize={13}>Nem tudom</Typography>
                            <SquareArrowLeft />
                        </Stack>

                        {/* Közép: Mutat (fent), nyilak, Visszavonás (lent) */}
                        <Stack alignItems="center">
                            <Typography fontSize={13}>Mutat</Typography>
                            <SquareArrowUp />
                            <SquareArrowDown />
                            <Typography fontSize={13}>Visszavonás</Typography>
                        </Stack>

                        {/* Jobb oldal: nyíl + szöveg */}
                        <Stack direction="row" alignItems="center" gap={0.5}>
                            <SquareArrowRight />
                            <Typography fontSize={13}>Tudom</Typography>
                        </Stack>

                    </Stack>
                </Stack>
            )}


        </Stack >
    );
};

export default FlashCardMain;
