"use client"

import { Mongoose_Progress_Serializable, Mongoose_Term_Serializable } from "@/lib/database/types"
import { Paper } from "@mui/material"
import { FC, useState } from "react"
import EditTerm from "./EditTerm"
import ReadTerm from "./ReadTerm"
import { HiddenMode } from "./TermList"

const Term: FC<{ term: Mongoose_Term_Serializable<{ progress: Mongoose_Progress_Serializable }>, hiddenMode: HiddenMode }> = ({ term, hiddenMode }) => {

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
                <EditTerm {...{ setMode, term: { _id: term._id, term: term.term, definition: term.definition } }} />
            )}
        </Paper>
    )

}

export default Term