'use client'

import useSet from "@/features/set/hooks/useSet";
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { Box, Chip, Stack, ToggleButton, ToggleButtonGroup, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import { termColor } from "../lib/constants";
import { HiddenMode, Term as TermType } from "../types";
import { getTermStats, termStatusCondition } from "../utils";
import HideModeFab from "./HideModeFab";
import TermCard from "./TermCard";
import TermRowCard from "./TermRowCard";

const TermList: FC<{}> = () => {

    const { set, isOwner } = useSet()
    const [showFab, setShowFab] = useState(false);
    const [selectedTerms, setSelectedTerms] = useState<"all" | "learning" | "learned" | "review">("all");
    const [selectedLayout, setSelectedLayout] = useState<"grid" | "list">("grid");
    const firstItemRef = useRef<HTMLDivElement | null>(null);
    const filterTerms = (terms: TermType[]) => {
        if (selectedTerms === "review") return terms.filter(termStatusCondition["review"]);
        if (selectedTerms === "learning") return terms.filter(termStatusCondition["learning"]);
        if (selectedTerms === "learned") return terms.filter(termStatusCondition["learned"]);
        return terms
    }

    const [hiddenMode, setHiddenMode] = useState<HiddenMode>(null)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const layout = isMobile ? "grid" : selectedLayout;

    const handleLayoutChange = (
        event: React.MouseEvent<HTMLElement>,
        newLayout: "grid" | "list",
    ) => {
        setSelectedLayout(newLayout);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowFab(true);
                } else if (entry.boundingClientRect.top > 0) {
                    setShowFab(false);
                }
            },
            { threshold: 0 }
        );

        if (firstItemRef.current) observer.observe(firstItemRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                    {(isOwner || set.task) && (
                        <Stack direction="row" gap={2} sx={{
                            maxWidth: "100%",
                            overflowX: "scroll",
                            "::-webkit-scrollbar": {
                                display: "none"
                            },
                        }}>
                            <Chip
                                label={`Összes (${getTermStats(set.terms).all})`}
                                variant={selectedTerms === "all" ? "filled" : "outlined"}
                                clickable
                                onClick={() => setSelectedTerms("all")} />
                            <Chip
                                label={`Tanulás alatt (${getTermStats(set.terms).learning})`}
                                variant={selectedTerms === "learning" ? "filled" : "outlined"}
                                clickable
                                onClick={() => setSelectedTerms("learning")}
                                sx={{
                                    ...selectedTerms === "learning" && {
                                        backgroundColor: termColor["learning"],
                                        color: "#fff",
                                    }
                                }}
                            />
                            <Chip
                                label={`Megtanulva (${getTermStats(set.terms).learned})`}
                                variant={selectedTerms === "learned" ? "filled" : "outlined"}
                                clickable
                                onClick={() => setSelectedTerms("learned")}
                                sx={{
                                    ...selectedTerms === "learned" && {
                                        backgroundColor: termColor["learned"],
                                        color: "#fff",
                                    }
                                }}
                            />
                            <Chip
                                label={`Ismétlés (${getTermStats(set.terms).review})`}
                                variant={selectedTerms === "review" ? "filled" : "outlined"}
                                clickable
                                onClick={() => setSelectedTerms("review")}
                                sx={{
                                    ...selectedTerms === "review" && {
                                        backgroundColor: termColor["review"],
                                        color: "#fff",
                                    }
                                }}
                            />
                        </Stack>
                    )}
                </Box>

                <Stack direction="row" justifyContent="flex-end">
                    <ToggleButtonGroup
                        exclusive
                        value={selectedLayout}
                        onChange={handleLayoutChange}
                        aria-label="Kifejezesek elrendezese"
                        sx={{
                            "& .MuiToggleButton-root": {
                                width: 40,
                                height: 40,
                                p: 0,
                            }
                        }}
                    >
                        <Tooltip title="Rács nézet">
                            <ToggleButton value="grid" aria-label="Racs nezet">
                                <ViewCompactIcon fontSize="small" />
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="Lista nézet">
                            <ToggleButton value="list" aria-label="Lista nezet">
                                <ViewHeadlineIcon fontSize="small" />
                            </ToggleButton>
                        </Tooltip>
                    </ToggleButtonGroup>
                </Stack>

            </Stack>

            <LayoutGroup>
                <Box
                    component={motion.div}
                    layout
                    sx={{
                        display: layout === "list" ? "flex" : "grid",
                        flexDirection: "column",
                        alignItems: layout === "list" ? "stretch" : undefined,
                        gap: 2,
                        gridTemplateColumns: layout === "grid"
                            ? {
                                sm: "1fr",
                                md: "repeat(2, minmax(0, 1fr))",
                                xl: "repeat(3, minmax(0, 1fr))",
                            }
                            : undefined,
                    }}
                >
                    {filterTerms(set.terms).map((term, index) => (
                        <motion.div
                            key={term.id}
                            layoutId={`term-${term.id}`}
                            layout
                            transition={{
                                layout: {
                                    type: "spring",
                                    stiffness: 420,
                                    damping: 34,
                                },
                            }}
                            style={{
                                display: layout === "grid" ? "flex" : undefined,
                                height: layout === "grid" ? "100%" : undefined,
                            }}
                        >
                            {layout === "list" ? (
                                <TermRowCard
                                    {...index === 0 && { ref: firstItemRef }}
                                    term={term}
                                    hiddenMode={hiddenMode}
                                />
                            ) : (
                                <TermCard
                                    {...index === 0 && { ref: firstItemRef }}
                                    term={term}
                                    hiddenMode={hiddenMode}
                                />
                            )}
                        </motion.div>
                    ))}
                </Box>

                <AnimatePresence>
                    {set.terms.length > 0 && showFab && (
                        <HideModeFab
                            hiddenMode={hiddenMode}
                            onHideModeChange={setHiddenMode}
                        />
                    )}
                </AnimatePresence>
            </LayoutGroup>

        </>


    )


}

export default TermList
