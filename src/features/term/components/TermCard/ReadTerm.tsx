"use client"

import ProgressStatus from '@/components/ui/ProgressStatus';
import useSet from '@/features/set/hooks/useSet';
import { Box, Collapse, IconButton, Stack, Typography } from "@mui/material";
import { Quote, Volume2 } from 'lucide-react';
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { HiddenMode, Term } from '../../types';
import speak from '../../utils/speak';
import Highlighter from '../Highlighter';
import TermCardMenu from './TermCardMenu';
import TermStatusLabel from './TermStatusLabel';


const ReadTerm: FC<{
    setMode: Dispatch<SetStateAction<"edit" | "read">>,
    term: Term,
    hiddenMode: HiddenMode,
    statusColor: string,
}> = ({ setMode, term, hiddenMode, statusColor }) => {

    const [hideOverride, setHideOverride] = useState<HiddenMode>(null)
    const [showExample, setShowExample] = useState(false);
    const { isOwner } = useSet()

    const getHiddenData = (mode: HiddenMode) => {

        return {
            hidden: hiddenMode === mode && hideOverride !== mode ? true : false,
            ...hiddenMode === mode ? {
                sx: {
                    ...hideOverride !== mode && {
                        filter: "blur(8px)",
                        userSelect: "none"
                    },
                    cursor: "pointer",
                }
            } : { sx: {} }
        }
    }

    const handleHideOverride = (mode: HiddenMode) => {
        if (!hiddenMode || hiddenMode !== mode) return;
        if (hideOverride === mode) {
            setHideOverride(null)
        } else {
            setHideOverride(mode)
        }
    }

    useEffect(() => {
        setHideOverride(null)
    }, [hiddenMode])



    return (
        <Stack direction="row" gap={2} alignItems="start" justifyContent="space-between">
            <Box sx={{
                flex: '1 1 0%',
            }}>
                {isOwner && (
                    <Stack direction="row" gap={1} alignItems="center" mb={1}>
                        <TermStatusLabel term={term} color={statusColor} />
                        <ProgressStatus score={term.status} color={statusColor} />
                    </Stack>
                )}


                <Stack direction="row" gap={1.5} alignItems="center">
                    <Typography sx={{
                        textWrap: "nowrap",
                        fontSize: 18,
                        fontWeight: 600,
                        ...getHiddenData("terms").sx
                    }}
                        onClick={() => handleHideOverride("terms")}
                    >
                        {term.term.content}
                    </Typography>
                    <IconButton onClick={() => !getHiddenData("terms").hidden && speak(term.term.content, term.term.lang)} sx={{
                        width: 32,
                        height: 32,
                        ...getHiddenData("terms").sx

                    }}>
                        <Volume2 />
                    </IconButton>
                </Stack>
                <Stack direction="row" gap={1.5} alignItems="center">
                    <Typography sx={{
                        color: "text.secondary",
                        textWrap: "nowrap",
                        fontWeight: 400,
                        fontSize: 14,
                        ...getHiddenData("definitions").sx
                    }}

                        onClick={() => handleHideOverride("definitions")}
                    >
                        {term.definition.content.map((word, index) => word + (index < term.definition.content.length - 1 ? ", " : ""))}
                    </Typography>
                    <IconButton onClick={() => !getHiddenData("definitions").hidden && speak(term.definition.content.join(), term.definition.lang)} sx={{
                        width: 32,
                        height: 32,
                        ...getHiddenData("definitions").sx

                    }}>
                        <Volume2 />
                    </IconButton>
                </Stack>
                {term.exampleSentence && (
                    <Box mt={1.5}>
                        <Box
                            onClick={() => setShowExample(!showExample)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                cursor: 'pointer',
                                color: 'text.secondary',
                                '&:hover': { opacity: 0.8 },
                            }}
                        >
                            <Quote size={13} />
                            <Typography variant="caption" fontWeight={500}>
                                {showExample ? 'Példaszöveg elrejtése' : 'Példaszöveg mutatása'}
                            </Typography>
                        </Box>

                        <Collapse in={showExample} >
                            <Box
                                mt={1}
                                p={1.5}
                                sx={{
                                    borderRadius: 2,
                                    borderLeft: 3,
                                    borderColor: statusColor,
                                }}
                            >
                                <Typography sx={{
                                    fontStyle: 'italic',
                                    mb: 0.5,
                                    color: 'text.secondary',
                                    fontSize: 13,
                                    ...getHiddenData("terms").sx
                                }} >
                                    &quot;<Highlighter text={term.exampleSentence} stemsInput={term.term.content} />&quot;
                                </Typography>
                            </Box>
                        </Collapse>


                    </Box>
                )}
            </Box>

            <Stack direction="row" gap={1} alignItems="center" sx={{ flexDirection: { xs: "column", sm: "row" } }}>
                {isOwner && (
                    <TermCardMenu term={term} setMode={setMode} />
                )}
            </Stack>
        </Stack >
    )
}

export default ReadTerm