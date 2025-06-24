"use client"

import ProgressStatus from '@/components/ui/ProgressStatus';
import useSet from '@/features/set/hooks/useSet';
import { Divider, IconButton, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Edit2Icon, Volume2 } from 'lucide-react';
import { Dispatch, FC, SetStateAction, useState } from "react";
import { HiddenMode, Term } from '../types';
import speak from '../utils/speak';


const ReadTerm: FC<{
    setMode: Dispatch<SetStateAction<"edit" | "read">>,
    term: Term,
    hiddenMode: HiddenMode,
}> = ({ setMode, term, hiddenMode }) => {

    const [hiddenTerm, setHiddenTerm] = useState(true)
    const [hiddenDefinition, setHiddenDefinition] = useState(true)

    const theme = useTheme()
    const { isOwner } = useSet()

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const hidden = {
        terms: hiddenMode === "terms" && hiddenTerm,
        definitions: hiddenMode === "definitions" && hiddenDefinition
    }

    const hiddenSx = {
        color: "transparent",
        textShadow: `0 0 15px ${theme.vars.palette.text.primary}`,
        userSelect: "none"
    }



    return (
        <Stack direction="row" gap={2} alignItems="center">
            <Stack sx={{
                width: "100%",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1, sm: 2 },
                alignItems: { xs: "flex-start", sm: "center" }
            }}>
                <Stack direction="row" gap={1} alignItems="center" sx={{ flex: 0.6, ...hidden.terms && hiddenSx, }}>
                    <Typography sx={{
                        cursor: hiddenMode === "terms" ? "pointer" : "auto"
                    }}
                        onClick={() => hiddenMode && setHiddenTerm(!hiddenTerm)}
                    >
                        {term.term.content}
                    </Typography>
                    {!hidden.terms && (
                        <IconButton onClick={() => speak(term.term.content, term.term.lang)} sx={{ height: "fit-content" }}>
                            <Volume2 />
                        </IconButton>
                    )}

                </Stack>

                <Divider flexItem orientation={!isMobile ? "vertical" : "horizontal"} />
                <Stack direction="row" gap={1} alignItems="center" sx={{ flex: 1, ...hidden.definitions && hiddenSx, }}>

                    <Typography sx={{

                        cursor: hiddenMode === "definitions" ? "pointer" : "auto"
                    }}
                        onClick={() => hiddenMode && setHiddenDefinition(!hiddenDefinition)}
                    >
                        {term.definition.content.map((word, index) => word + (index < term.definition.content.length - 1 ? ", " : ""))}
                    </Typography>
                    {!hidden.definitions && (
                        <IconButton onClick={() => speak(term.definition.content.join(), term.definition.lang)} sx={{ height: "fit-content" }}>
                            <Volume2 />
                        </IconButton>
                    )}

                </Stack>


            </Stack >
            <Stack direction="row" gap={1} alignItems="center" sx={{ flexDirection: { xs: "column", sm: "row" } }}>
                {isOwner && (
                    <Tooltip title="Szerkesztés">
                        <IconButton onClick={() => setMode("edit")} sx={{ height: "fit-content" }}>
                            <Edit2Icon />
                        </IconButton >
                    </Tooltip>

                )}

                {isOwner && (
                    <ProgressStatus score={term.status} />
                )}







            </Stack>


        </Stack >

    )
}

export default ReadTerm