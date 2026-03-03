import { Box, Stack, Typography } from '@mui/material'
import { FC } from 'react'

const ProgressStatus: FC<{ score: number, color: string }> = ({ score, color }) => {


    return <Stack direction="row" gap={1} alignItems="center">
        <Stack direction="row" gap={0.25} alignItems="center">
            {[1, 2, 3, 4, 5].map(level => (
                <Box
                    key={Math.random()}
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: level <= score ? color : 'grey.300',
                        transition: 'background-color 0.2s',
                    }}
                />
            ))}
        </Stack>
        <Typography
            variant="caption"
            color="text.secondary"
            sx={{ ml: 0.5, fontSize: '0.7rem' }}>
            {score}/5
        </Typography>
    </Stack>




}

export default ProgressStatus