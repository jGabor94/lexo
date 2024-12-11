import { CircularProgress, Stack } from '@mui/material'
import { FC } from 'react'

const loading: FC<{}> = () => {

    return (
        <Stack alignItems="center">
            <CircularProgress sx={{ width: 100, height: 100 }} />
        </Stack>
    )
}

export default loading