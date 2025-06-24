"use client"

import useFlashCard from "@/features/practice/hooks/useFlashCard";
import { Box, BoxProps, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import LangCodeLabel from "./components/LangCodeLabel";

const FlashCardContent: FC<BoxProps> = (boxProps) => {

    const { terms, index, isFlipped, setIsFlipped } = useFlashCard()

    const { term, definition } = terms[index]

    return (

        <Box onClick={() => setIsFlipped(state => !state)} {...boxProps} sx={{
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
