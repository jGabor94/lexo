"use client"

import ProgressStatus from "@/components/ui/ProgressStatus"
import useSet from "@/features/set/hooks/useSet"
import { Box, Collapse, IconButton, Stack, Typography } from "@mui/material"
import { Quote, Volume2 } from "lucide-react"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { HiddenMode, Term } from "../../types"
import speak from "../../utils/speak"
import Highlighter from '../Highlighter'
import TermCardMenu from "../TermCard/TermCardMenu"
import TermStatusLabel from "../TermCard/TermStatusLabel"


const ReadTerm: FC<{
    setMode: Dispatch<SetStateAction<"edit" | "read">>,
    term: Term,
    hiddenMode: HiddenMode,
    statusColor: string,
}> = ({ setMode, term, hiddenMode, statusColor }) => {
    const [hideOverride, setHideOverride] = useState<HiddenMode>(null)
    const [showExample, setShowExample] = useState(false)
    const { isOwner, set } = useSet()

    const getHiddenData = (mode: HiddenMode) => ({
        hidden: hiddenMode === mode && hideOverride !== mode,
        sx: hiddenMode === mode ? {
            ...hideOverride !== mode && {
                filter: "blur(8px)",
                userSelect: "none",
            },
            cursor: "pointer",
        } : {}
    })

    const handleHideOverride = (mode: HiddenMode) => {
        if (!hiddenMode || hiddenMode !== mode) return
        setHideOverride(hideOverride === mode ? null : mode)
    }

    useEffect(() => {
        setHideOverride(null)
    }, [hiddenMode])

    return (
        <Stack>
            <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "stretch", md: "center" }}
                justifyContent="space-between"
                gap={2}
            >
                <Stack direction="row" alignItems="center" gap={1.25} sx={{ minWidth: 0, flex: 1 }}>
                    {(isOwner || set.task) && (
                        <Stack direction="row" gap={1} alignItems="center" sx={{ flexShrink: 0 }}>
                            <TermStatusLabel term={term} color={statusColor} />
                            <ProgressStatus score={term.progress?.status || 0} color={statusColor} />
                        </Stack>
                    )}

                    <Stack direction="row" alignItems="center" gap={0.75} sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                            sx={{
                                minWidth: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                fontSize: 17,
                                fontWeight: 700,
                                ...getHiddenData("terms").sx
                            }}
                            onClick={() => handleHideOverride("terms")}
                        >
                            {term.term.content}
                        </Typography>
                        <IconButton
                            onClick={() => !getHiddenData("terms").hidden && speak(term.term.content, term.term.lang)}
                            sx={{
                                width: 32,
                                height: 32,
                                flexShrink: 0,
                                ...getHiddenData("terms").sx
                            }}
                        >
                            <Volume2 size={18} />
                        </IconButton>
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" gap={0.75} sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                        sx={{
                            minWidth: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                            fontSize: 15,
                            fontWeight: 500,
                            ...getHiddenData("definitions").sx
                        }}
                        onClick={() => handleHideOverride("definitions")}
                    >
                        {term.definition.content.join(", ")}
                    </Typography>
                    <IconButton
                        onClick={() => !getHiddenData("definitions").hidden && speak(term.definition.content.join(), term.definition.lang)}
                        sx={{
                            width: 32,
                            height: 32,
                            flexShrink: 0,
                            ...getHiddenData("definitions").sx
                        }}
                    >
                        <Volume2 size={18} />
                    </IconButton>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="flex-end" gap={1} sx={{ flexShrink: 0 }}>
                    <IconButton

                        size="small"
                        onClick={() => setShowExample(!showExample)}
                        sx={{
                            color: showExample ? statusColor : "text.secondary",
                            visibility: term.exampleSentence ? "visible" : "hidden",
                        }}
                    >
                        <Quote size={18} />
                    </IconButton>

                    {isOwner && (
                        <TermCardMenu term={term} setMode={setMode} />
                    )}
                </Stack>
            </Stack>

            {term.exampleSentence && (
                <Collapse in={showExample}>
                    <Box
                        p={1.5}
                        mt={1.5}
                        sx={{
                            borderRadius: 2,
                            borderLeft: 3,
                            borderColor: statusColor,
                            bgcolor: "rgba(148, 163, 184, 0.08)",
                        }}
                    >
                        <Typography
                            sx={{
                                fontStyle: "italic",
                                color: "text.secondary",
                                fontSize: 13,
                                ...getHiddenData("terms").sx
                            }}
                        >
                            &quot;<Highlighter text={term.exampleSentence} stemsInput={term.term.content} />&quot;
                        </Typography>
                    </Box>
                </Collapse>
            )}
        </Stack>
    )
}

export default ReadTerm