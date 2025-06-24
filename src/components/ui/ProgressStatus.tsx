import { Box, Tooltip } from '@mui/material'
import { FC } from 'react'

const ProgressStatus: FC<{ score: number }> = ({ score }) => {

    return (
        <Tooltip title={`Tudásszint: ${score}`}>
            <Box
                sx={{
                    width: 30,
                    backgroundColor: "divider",
                    height: "fit-content",
                    borderRadius: 10,
                }}
            >
                <Box sx={{ width: 30 * (score / 5), overflow: "hidden" }}>
                    <Box
                        sx={({ palette: { error, warning, primary, success } }) => ({
                            width: 30,
                            height: "4px",
                            background: `linear-gradient(90deg, ${error.dark}, ${warning.light}, ${success.main}, ${primary.light},${primary.main})`,
                            borderRadius: 10,
                        })}
                    />
                </Box>
            </Box>
        </Tooltip>
    )
}

export default ProgressStatus