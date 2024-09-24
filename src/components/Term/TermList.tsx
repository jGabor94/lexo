'use client'

import useSet from "@/lib/hooks/useSet";
import { Paper, Stack } from "@mui/material";
import { FC, MouseEvent, useState } from "react";
import { ToggleButton, ToggleGroup } from "../toggleButton";
import Term from "./Term";

export type HiddenMode = "terms" | "definitions" | null

const TermList: FC<{}> = () => {

    const { set } = useSet()

    const [hiddenMode, setHiddenMode] = useState<HiddenMode>(null)

    const handleAlignment = (e: MouseEvent<HTMLElement>, newValue: HiddenMode) => {
        setHiddenMode(newValue);
    };

    return set && (

        <Stack gap={1} justifyContent="center" alignItems="center" mt={4}>
            {set.terms.map(term => (
                <Term key={term._id}{...{ term, hiddenMode }} />
            ))}
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
                                Hide terms
                            </ToggleButton>
                        </Stack>

                    </ToggleGroup>
                </Stack>
            )}

        </Stack>

    )
}

export default TermList