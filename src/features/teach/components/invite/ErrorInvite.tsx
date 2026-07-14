import GppBadIcon from '@mui/icons-material/GppBad'
import { Button, Paper, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { FC } from 'react'

const ErrorInvite: FC = () => (
    <Paper
        sx={{
            width: 500,
            maxWidth: "95%",
            px: { xs: 2.5, md: 4 },
            py: { xs: 3, md: 4 },
            borderRadius: 5,
        }}
    >
        <Stack gap={3} alignItems="center" textAlign="center" width="100%">
            <GppBadIcon color="error" sx={{ fontSize: 56 }} />
            <Stack gap={1.5} alignItems="center">
                <Typography
                    sx={{
                        fontSize: 16,
                        color: "text.primary",
                        lineHeight: 1.75,
                        textWrap: "pretty",
                    }}
                >
                    A megíhvó nem létezik vagy vagy rendszerhiba történt.
                </Typography>

                <Typography
                    sx={{
                        fontSize: 14,
                        color: "text.secondary",
                        lineHeight: 1.7,
                        textWrap: "pretty",
                    }}
                >
                </Typography>
            </Stack>

            <Button LinkComponent={Link} href="/home" variant="contained" fullWidth sx={{ borderRadius: 3, minHeight: 46, fontWeight: 700 }}>
                Irány a főoldal
            </Button>
        </Stack>
    </Paper >
)


export default ErrorInvite