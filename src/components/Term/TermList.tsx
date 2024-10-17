'use client'

import useSet from "@/lib/hooks/useSet";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Paper, Stack, Typography } from "@mui/material";
import { FC, MouseEvent, useState } from "react";
import { ToggleButton, ToggleGroup } from "../toggleButton";
import TextLine from "../ui/TextLine";
import Term from "./Term";

export type HiddenMode = "terms" | "definitions" | null

const TermList: FC<{}> = () => {

    const { set } = useSet()

    const [hiddenMode, setHiddenMode] = useState<HiddenMode>(null)

    const handleAlignment = (e: MouseEvent<HTMLElement>, newValue: HiddenMode) => {
        setHiddenMode(newValue);
    };

    const stillLearningTerms = set.terms.filter(term => term.progress?.status < 5)
    const learnedTerms = set.terms.filter(term => term.progress?.status === 5)
    const withoutProgessTerms = set.terms.filter(term => !term.progress)

    return (
        <Stack gap={3} justifyContent="center" alignItems="center" mt={4}>
            <Stack gap={1} width="100%">
                {withoutProgessTerms.map(term => (
                    <Term key={term._id}{...{ term, hiddenMode }} />
                ))}
            </Stack>

            {stillLearningTerms.length > 0 && (
                <Stack width="100%" gap={1}>
                    <TextLine>
                        <Stack direction="row" gap={1}>
                            <PendingActionsIcon sx={{ color: "warning.dark" }} />
                            <Typography color="warning.dark" fontSize={17} fontWeight={500} >Still learning</Typography>
                        </Stack>

                    </TextLine>
                    {stillLearningTerms.map(term => (
                        <Term key={term._id}{...{ term, hiddenMode }} />
                    ))}
                </Stack>
            )}
            {learnedTerms.length > 0 && (
                <Stack width="100%" gap={1}>
                    <TextLine>
                        <Stack direction="row" gap={1}>
                            <CheckCircleOutlineIcon sx={{ color: "primary.main" }} />
                            <Typography color="primary.main" fontSize={17} fontWeight={500} >Learned</Typography>
                        </Stack>
                    </TextLine>
                    {learnedTerms.map(term => (
                        <Term key={term._id}{...{ term, hiddenMode }} />
                    ))}
                </Stack>
            )}
            {set.terms.length > 0 && (
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
            )}

        </Stack>
    )


}

export default TermList