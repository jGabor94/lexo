import { Stack, Typography } from "@mui/material"
import { CircleCheck } from "lucide-react"
import { FC } from "react"

const Feature: FC<{ text: string }> = ({ text }) => (
    <Stack direction="row" gap={1.25} alignItems="center">
        <CircleCheck size={18} color="#06b6d4" />
        <Typography sx={{ fontWeight: 500 }}>{text}</Typography>
    </Stack>
)

export default Feature