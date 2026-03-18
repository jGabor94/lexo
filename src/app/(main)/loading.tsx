
import LoadingLogo from '@/components/ui/LoadingLogo'
import { Stack } from '@mui/material'
import { FC } from 'react'

const Loading: FC<{}> = () => (
    <Stack alignItems="center" sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: " translate(-50%, -50%)",
    }}>
        <LoadingLogo />
    </Stack>
)

export default Loading