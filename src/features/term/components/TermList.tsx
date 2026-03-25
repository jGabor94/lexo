'use client'

import useSet from "@/features/set/hooks/useSet";
import { Box, Chip, Stack } from "@mui/material";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import { termColor } from "../lib/constants";
import { HiddenMode, Term as TermType } from "../types";
import { getTermStats, termStatusCondition } from "../utils";
import HideModeFab from "./HideModeFab";
import TermCard from "./TermCard";

const TermList: FC<{}> = () => {

    const { set, isOwner } = useSet()
    const [showFab, setShowFab] = useState(false);
    const [selectedTerms, setSelectedTerms] = useState<"all" | "learning" | "learned" | "review">("all");
    const firstItemRef = useRef<HTMLDivElement | null>(null);
    const filterTerms = (terms: TermType[]) => {
        if (selectedTerms === "review") return terms.filter(termStatusCondition["review"]);
        if (selectedTerms === "learning") return terms.filter(termStatusCondition["learning"]);
        if (selectedTerms === "learned") return terms.filter(termStatusCondition["learned"]);
        return terms
    }

    const [hiddenMode, setHiddenMode] = useState<HiddenMode>(null)

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
            {isOwner && (
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


            <LayoutGroup>
                <Box component={motion.div} sx={{
                    display: "grid",
                    gap: 2, height: "auto",
                    gridTemplateColumns: {
                        sm: '1fr',
                        md: 'repeat(2, 1fr)',
                        xl: 'repeat(3, 1fr)'
                    },
                }}>
                    {filterTerms(set.terms).map((term, index) => (
                        <TermCard {...index === 0 && { ref: firstItemRef }} key={term.id}{...{ term, hiddenMode }} />
                    ))}
                </Box>
                <AnimatePresence>
                    {set.terms.length > 0 && showFab && (
                        <HideModeFab hiddenMode={hiddenMode} onHideModeChange={setHiddenMode} />
                    )
                    }
                </AnimatePresence>

            </LayoutGroup>
        </>


    )


}

export default TermList