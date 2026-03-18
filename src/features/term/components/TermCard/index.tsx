"use client"

import { Paper } from "@mui/material"
import { motion } from "framer-motion"
import { FC, RefObject, useState } from "react"
import { HiddenMode, Term as TermType } from "../../types"
import { getTermUiData } from "../../utils"
import EditTerm from "./EditTerm"
import ReadTerm from "./ReadTerm"


const TermCard: FC<{ term: TermType, hiddenMode: HiddenMode, ref?: RefObject<HTMLDivElement | null> }> = ({ term, hiddenMode, ref }) => {

    const [mode, setMode] = useState<"read" | "edit">("read")

    return (

        <Paper
            component={motion.div}
            layout="position"
            ref={ref}
            transition={{
                layout: {
                    type: "tween",
                    ease: "linear",
                    duration: 0.2,
                }
            }}
            sx={{

                overflow: "hidden",
                p: 2,
                bgcolor: 'card.main',

                border: mode === "edit"
                    ? `1px solid ${getTermUiData(term).color}`
                    : "1px solid transparent",
                "&:hover": {
                    boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                },

            }}>
            {mode === "read" ? (
                <ReadTerm {...{ setMode, term, hiddenMode, statusColor: getTermUiData(term).color }} />
            ) : (
                <EditTerm {...{ setMode, term, statusColor: getTermUiData(term).color }} />
            )}
        </Paper>
    )

}

export default TermCard