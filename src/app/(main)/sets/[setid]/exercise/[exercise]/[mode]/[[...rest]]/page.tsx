"use client"

import Completed from "@/features/practice/components/complete";
import FlashCardMain from "@/features/practice/components/flashCard/FlashCardMain";
import QuizMain from "@/features/practice/components/quiz/QuizMain";
import useExerciseController from "@/features/practice/hooks/useExerciseController";
import { Exercise } from "@/features/practice/types";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FC } from "react";

const Page: FC = () => {

    const { terms, completed, loading } = useExerciseController()
    const { setid, exercise } = useParams<{ setid: string, exercise: Exercise }>()
    if (loading) return <Stack sx={{ alignItems: "center", justifyContent: "center", height: 500 }}>
        <CircularProgress />
    </Stack>
    if (completed) return <Completed />

    if (terms?.length === 0) return (
        <Stack gap={2} alignItems="center">
            <Typography>Az összes kifejezést megtanultad</Typography>
            <Button component={Link} href={`/sets/${setid}`}>Vissza</Button>
        </Stack>
    );

    if (exercise === "flashcard") return (<FlashCardMain />)
    if (exercise === "quiz") return (<QuizMain />)
}

export default Page;
