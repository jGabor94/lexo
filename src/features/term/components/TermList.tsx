'use client'

import Sort from "@/components/Sort";
import { ToggleButton, ToggleGroup } from "@/components/toggleButton";
import useSet from "@/features/set/hooks/useSet";
import useSort from "@/hooks/useSort";
import { Divider, Paper, Stack, Typography, useTheme } from "@mui/material";
import { CircleCheckBig, ListTodo } from "lucide-react";
import { FC, Fragment, MouseEvent, useState } from "react";
import { HiddenMode, Term as TermType } from "../types";
import Term from "./Term";

const TermList: FC<{}> = () => {

    const { set, isOwner } = useSet()

    const theme = useTheme()

    const sortState = useSort([
        {
            label: "Eredeti",
            sort: (a: TermType, b: TermType) => 0
        },
        {
            label: "Előrehaladás",
            sort: (a: TermType, b: TermType) => a.status - b.status
        },
        {
            label: "Kifjezeés",
            sort: (a: TermType, b: TermType) => a.term.content.localeCompare(b.term.content)
        },
        {
            label: "Definíció",
            sort: (a: TermType, b: TermType) => a.definition.content[0].localeCompare(b.definition.content[0])
        },
    ])
    const [hiddenMode, setHiddenMode] = useState<HiddenMode>(null)

    const handleAlignment = (e: MouseEvent<HTMLElement>, newValue: HiddenMode) => {
        setHiddenMode(newValue);
    };

    const stillLearningTerms = sortState.sort(set.terms.filter(term => term.status < 5))
    const learnedTerms = sortState.sort(set.terms.filter(term => term.status === 5))



    return (
        <Stack gap={3} justifyContent="center" alignItems="center" mt={4}>
            {!isOwner ? (
                <Stack gap={1} width="100%">
                    {set.terms.map(term => (
                        <Term key={term.id}{...{ term, hiddenMode }} />
                    ))}
                </Stack>
            ) : (
                <Stack gap={8} width="100%">
                    {stillLearningTerms.length > 0 && (
                        <Stack width="100%" gap={1} >
                            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} >
                                <Stack direction="row" gap={1}>
                                    <ListTodo color={theme.vars.palette.warning.dark} />
                                    <Typography color="warning.dark" fontSize={17} fontWeight={500} >Tanulás alatt</Typography>
                                </Stack>

                                <Sort sortState={sortState} />

                            </Stack>

                            <Divider flexItem />

                            {stillLearningTerms.map(term => (
                                <Fragment key={term.id}>
                                    <Term key={term.id}{...{ term, hiddenMode }} />
                                    <Divider flexItem />
                                </Fragment>
                            ))}
                        </Stack>
                    )
                    }
                    {
                        learnedTerms.length > 0 && (
                            <Stack width="100%" gap={1} >
                                <Stack direction="row" gap={1} >
                                    <CircleCheckBig color={theme.vars.palette.primary.main} />
                                    <Typography color="primary.main" fontSize={17} fontWeight={500} >Megtanult</Typography>
                                </Stack>
                                <Divider flexItem />
                                {learnedTerms.map(term => (
                                    <Fragment key={term.id}>
                                        <Term key={term.id}{...{ term, hiddenMode }} />
                                        <Divider flexItem />

                                    </Fragment>


                                ))}
                            </Stack>
                        )
                    }
                </Stack>
            )}



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
                                    Kifejezések elrejtése
                                </ToggleButton>
                                <ToggleButton value="definitions" sx={{ textTransform: "none" }}>
                                    Definíciók elrejtése
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