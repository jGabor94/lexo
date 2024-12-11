"use client"

import { Paper } from "@mui/material"
import { FC, useState } from "react"
import { HiddenMode, Term as TermType } from "../types"
import EditTerm from "./EditTerm"
import ReadTerm from "./ReadTerm"

const Term: FC<{ term: TermType, hiddenMode: HiddenMode }> = ({ term, hiddenMode }) => {

    const [mode, setMode] = useState<"read" | "edit">("read")

    return (
        <Paper
            sx={{
                width: "100%",
                p: 2
            }}>
            {mode === "read" ? (
                <ReadTerm {...{ setMode, term, hiddenMode }} />
            ) : (
                <EditTerm {...{ setMode, term }} />
            )}
        </Paper>
    )

}

export default Term