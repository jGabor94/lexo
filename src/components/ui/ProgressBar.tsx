import { Box, Stack, useTheme } from '@mui/material'
import { FC } from 'react'

const ProgressBar: FC<{ percentage: string }> = ({ percentage }) => {

    const { palette: { background, error, warning, primary, secondary, text } } = useTheme()
    return (
        <Stack direction="row" sx={{
            width: "100%",
            height: "1px",
            background: `linear-gradient(90deg, ${error.light} 10%, ${warning.main} 30%, ${warning.light} 50%, ${secondary.main} 70%, ${primary.main} 90%)`
        }}>
            <Box sx={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(90deg, rgba(239,83,80,0) ${percentage}, #7f7f7f ${percentage})`
            }} />
        </Stack>
    )
}

export default ProgressBar