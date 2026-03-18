"use client";

import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FC } from "react";
import useExerciseController from "../hooks/useExerciseController";
import { Exercise } from "../types";
import Completed from "./complete";
import FlashCardLayout from "./flashCard/FlashCardMain";
import QuizLayout from "./quiz/QuizMain";


const ExerciseMain: FC = () => {

    const { terms, completed, loading } = useExerciseController()
    const { setid, exercise } = useParams<{ setid: string, exercise: Exercise }>()

    if (loading) return <CircularProgress sx={{ margin: "0 auto" }} />
    if (completed) return <Completed />

    if (terms?.length === 0) return (
        <Stack gap={2} alignItems="center">
            <Typography>Az összes kifejezést megtanultad</Typography>
            <Button component={Link} href={`/sets/${setid}`}>Vissza</Button>
        </Stack>
    );

    if (exercise === "flashcard") return (<FlashCardLayout />)
    if (exercise === "quiz") return (<QuizLayout />)
};

export default ExerciseMain;
