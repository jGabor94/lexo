"use client"

import { Term } from "@/features/term/types";
import { Button, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import useQuiz from "../../hooks/useQuiz";
import { modeMap } from "../../lib/contants";
import { PracticeMode } from "../../types";
import { shuffle } from "../../utils";

const getOptions = (terms: Term[], currentIndex: number) => {
    const arr = [...terms]
    arr.splice(currentIndex, 1)
    const wrongOptions = shuffle(arr).slice(0, 3)
    return shuffle([...wrongOptions, terms[currentIndex]])
}

const getMarking = (selected: null | string, option: Term, terms: Term[], currentIndex: number) => {
    if (selected) {
        if (selected === option.id) {
            if (selected === terms[currentIndex].id) return {
                border: "none",
                backgroundColor: "#3adb27"
            }
            return {
                border: "none",
                backgroundColor: "#ed3939"
            }
        } else if (option.id === terms[currentIndex].id) {
            return { border: "2px solid #3adb27" }
        }
    }
}

const QuizLayout: FC<{}> = () => {

    const { terms, index, successItems, wrongItems, handleSuccess, handleWrong } = useQuiz()
    const { mode } = useParams<{ mode: PracticeMode }>()

    const nextButtonRef = useRef<HTMLButtonElement>(null);


    const [currentIndex, setCurrentIndex] = useState(index)
    const [options, setOptions] = useState(getOptions(terms, index))

    const [selected, setSelected] = useState<null | string>(null)

    if (currentIndex !== index) {
        setOptions(getOptions(terms, index))
        setCurrentIndex(index)
    }

    const handleClick = (selectedOption: Term) => {
        !selected && setSelected(selectedOption.id)

    }


    const handleNext = () => {
        selected === terms[index].id ? handleSuccess() : handleWrong()
        setSelected(null)
    }

    useEffect(() => {
        if (selected && nextButtonRef.current) {
            nextButtonRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [selected])

    return (
        <Stack gap={2} sx={{
            width: 700, maxWidth: "100%"
        }} >
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
            <Stack gap={2}>
                <Typography fontSize={20} sx={{ color: "grey" }}>
                    Válaszd ki a megfelelő jelentést
                </Typography>
                <Divider flexItem />
                <Typography fontSize={20} sx={{ alignSelf: "center" }}>
                    {terms[index].term.content}
                </Typography>
            </Stack>

            <Grid container spacing={2} width="100%">
                {options.map((option, index) => (
                    <Grid key={index} size={{ xs: 12, md: 6 }} onClick={() => handleClick(option)}>
                        <Paper component={Stack} justifyContent="center" alignItems="center" sx={{ height: 70, width: "100%", cursor: "pointer", ...getMarking(selected, option, terms, currentIndex) }}>
                            {option.definition.content.map((word, index) => word + (index < option.definition.content.length - 1 ? ", " : ""))}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            {selected && (
                <Button onClick={handleNext} variant="contained" sx={{ alignSelf: "flex-end" }} ref={nextButtonRef}
                >Tovább</Button>
            )}
        </Stack >
    );
};

export default QuizLayout;
