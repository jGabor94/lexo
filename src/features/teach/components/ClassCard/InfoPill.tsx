import { Stack, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'

const InfoPill: FC<{ icon: ReactNode, text: string }> = ({ icon, text }) => (
    <Stack
        direction="row"
        alignItems="center"
        gap={0.75}
        sx={{
            px: 1.25,
            py: 0.75,
            borderRadius: 999,
            bgcolor: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(148, 163, 184, 0.18)"
        }}
    >
        {icon}
        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{text}</Typography>
    </Stack>
)


export default InfoPill