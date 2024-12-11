'use client'

import Sort from "@/components/Sort";
import { ToggleButton, ToggleGroup } from "@/components/toggleButton";
import TextLine from "@/components/ui/TextLine";
import useSet from "@/features/set/hooks/useSet";
import useSort from "@/hooks/useSort";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Paper, Stack, Typography } from "@mui/material";
import { FC, MouseEvent, useState } from "react";
import { HiddenMode, Term as TermType } from "../types";
import Term from "./Term";

const TermList: FC<{}> = () => {

    const { set } = useSet()

    const sortState = useSort([
        {
            label: "Orginial",
            sort: (a: TermType, b: TermType) => 0
        },
        {
            label: "Progress",
            sort: (a: TermType, b: TermType) => a.progress.status - b.progress.status
        },
        {
            label: "Term",
            sort: (a: TermType, b: TermType) => a.term.content.localeCompare(b.term.content)
        },
        {
            label: "Definiton",
            sort: (a: TermType, b: TermType) => a.definition.content[0].localeCompare(b.definition.content[0])
        },
    ])
    const [hiddenMode, setHiddenMode] = useState<HiddenMode>(null)

    const handleAlignment = (e: MouseEvent<HTMLElement>, newValue: HiddenMode) => {
        setHiddenMode(newValue);
    };

    const stillLearningTerms = sortState.sort(set.terms.filter(term => term.progress?.status < 5))
    const learnedTerms = sortState.sort(set.terms.filter(term => term.progress?.status === 5))
    const withoutProgessTerms = sortState.sort(set.terms.filter(term => !term.progress))


    return (
        <Stack gap={3} justifyContent="center" alignItems="center" mt={4}>
            <Stack gap={1} width="100%">
                {withoutProgessTerms.map(term => (
                    <Term key={term.id}{...{ term, hiddenMode }} />
                ))}
            </Stack>

            {stillLearningTerms.length > 0 && (
                <Stack width="100%" gap={1}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <TextLine>
                            <Stack direction="row" gap={1}>
                                <PendingActionsIcon sx={{ color: "warning.dark" }} />
                                <Typography color="warning.dark" fontSize={17} fontWeight={500} >Still learning</Typography>
                            </Stack>

                        </TextLine>
                        <Sort sortState={sortState} />

                    </Stack>


                    {stillLearningTerms.map(term => (
                        <Term key={term.id}{...{ term, hiddenMode }} />
                    ))}
                </Stack>
            )
            }
            {
                learnedTerms.length > 0 && (
                    <Stack width="100%" gap={1}>
                        <TextLine>
                            <Stack direction="row" gap={1}>
                                <CheckCircleOutlineIcon sx={{ color: "primary.main" }} />
                                <Typography color="primary.main" fontSize={17} fontWeight={500} >Learned</Typography>
                            </Stack>
                        </TextLine>
                        {learnedTerms.map(term => (
                            <Term key={term.id}{...{ term, hiddenMode }} />
                        ))}
                    </Stack>
                )
            }
            {
                set.terms.length > 0 && (
                    <Stack
                        component={Paper}
                        variant="elevation"
                        direction="row"
                        sx={{
                            p: 2,
                            zIndex: 1000,
                            position: "sticky",
                            bottom: 20,
                        }}>
                        <ToggleGroup onChange={handleAlignment}>
                            <Stack direction="row" gap={1}>
                                <ToggleButton value="terms" sx={{ textTransform: "none" }} >
                                    Hide terms
                                </ToggleButton>
                                <ToggleButton value="definitions" sx={{ textTransform: "none" }}>
                                    Hide definitions
                                </ToggleButton>
                            </Stack>

                        </ToggleGroup>
                    </Stack>
                )
            }

        </Stack >
    )


}

export default TermList