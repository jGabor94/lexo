"use client";

import { PracticeMode } from "@/features/practice/types";
import useSet from "@/features/set/hooks/useSet";
import SA_UpdateProgress from "@/features/term/actions/updateProgress";
import { Term } from "@/features/term/types";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import QuizProvider from "../../providers/QuizProvider";
import { shuffle } from "../../utils";
import Completed from "../complete";
import QuizLayout from "./QuizLayout";



const QuizMain: FC<{ mode: PracticeMode }> = ({ mode }) => {

    const prepareArray = (array: Term[]) =>
        shuffle(mode === "progress" ? array.filter((term) => term.status < 5) : array);

    const [loading, setLoading] = useState(false)
    const { set, mutate } = useSet()
    const [filteredTerms, setFilteredTerms] = useState<null | Term[]>(null);
    const [completed, setCompleted] = useState<null | { successItems: string[], wrongItems: string[] }>(null)

    const handleCompleted = async (successItems: string[], wrongItems: string[]) => {
        setLoading(true)
        if (mode === "progress") {
            await SA_UpdateProgress(successItems, wrongItems, set.id)
            await mutate()
        }
        setCompleted({ successItems, wrongItems })
        setLoading(false)
    };

    useEffect(() => {
        if (completed) setFilteredTerms(prepareArray(set.terms))
    }, [set.terms])

    useEffect(() => {
        setFilteredTerms(prepareArray(set.terms))
    }, [])

    if (loading) return (
        <Stack alignItems="center">
            <CircularProgress sx={{ margin: "0 auto" }} />
        </Stack>
    )

    if (completed) return (
        <Completed {...{ ...completed, setCompleted }} />
    )

    if (filteredTerms?.length === 0) {
        return (
            <Stack gap={2} alignItems="center">
                <Typography>You have learned all items</Typography>
                <Button component={Link} href={`/sets/${set.id}`}>Vissza</Button>
            </Stack>
        );
    }

    return (
        <Stack alignItems="center">
            {filteredTerms ? (
                <QuizProvider terms={filteredTerms} onCompleted={handleCompleted}>
                    <QuizLayout />
                </QuizProvider>
            ) : (
                <CircularProgress />
            )}
        </Stack>
    )
};

export default QuizMain;
