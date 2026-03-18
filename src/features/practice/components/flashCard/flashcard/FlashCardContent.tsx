"use client"

import useExerciseController from "@/features/practice/hooks/useExerciseController";
import { Box, BoxProps, Paper, Stack, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import LangCodeLabel from "./components/LangCodeLabel";

interface props extends BoxProps {
    isFlipped: boolean,
    setIsFlipped: Dispatch<SetStateAction<boolean>>
}

const FlashCardContent: FC<props> = ({ isFlipped, setIsFlipped, ...boxProps }) => {

    const { terms, index } = useExerciseController()
    const { term, definition } = terms[index]

    return (

        <Box onClick={() => setIsFlipped(!isFlipped)} {...boxProps} sx={{
            position: "absolute",
            cursor: "pointer",
            width: "100%",
            height: "100%",
            ...boxProps
        }}>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    perspective: 5000,
                    cursor: "pointer",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        transition: "transform 0.6s",
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "none",
                    }}

                >

                    <Paper
                        component={Stack}
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                        }}

                    >
                        <LangCodeLabel>
                            {term.lang}
                        </LangCodeLabel>
                        <Typography>{term.content}</Typography>
                    </Paper>

                    <Paper
                        component={Stack}
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                        }}
                    >
                        <LangCodeLabel>
                            {definition.lang}
                        </LangCodeLabel>
                        <Typography>{definition.content.join(", ")}</Typography>
                    </Paper>
                </Box>
            </Box>
        </Box >



    );
};

export default FlashCardContent;
