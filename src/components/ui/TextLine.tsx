import { Box, Stack } from "@mui/material"
import { FC, ReactNode } from "react"


const TextLine: FC<{ children: ReactNode }> = ({ children }) => (
    <Stack direction="row" sx={{ flexGrow: 1 }} alignItems="center" gap={2}>

        {children}
        <Box sx={{
            height: "1px",
            flexGrow: 1,
            backgroundColor: "divider",

        }} />
    </Stack>
)


export default TextLine