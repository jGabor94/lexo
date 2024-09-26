import { LinearProgress } from '@mui/material'
import { FC } from 'react'

const LinearLoading: FC<{ loading: boolean }> = ({ loading }) => loading && (
    <LinearProgress sx={{ position: "fixed", width: "100%", top: 0, left: 0, zIndex: 1000 }} />
)



export default LinearLoading