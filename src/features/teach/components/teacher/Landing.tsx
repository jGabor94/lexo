import Feature from '@/components/ui/Future'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import CreateClass from './CreateClass'

const Landing: FC<{}> = () => {
    return (
        <Paper
            sx={{
                p: { xs: 2.5, md: 4 },
                borderRadius: 6,
                background: "linear-gradient(135deg, rgba(60,200,175,0.12) 0%, rgba(60,200,244,0.16) 100%)",
                border: "1px solid rgba(60, 200, 175, 0.20)",
                overflow: "hidden"
            }}
        >
            <Stack gap={4}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    gap={3}
                >
                    <Stack gap={1.5} sx={{ maxWidth: 760 }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.6, color: "#0f766e" }}>
                            TANÁR
                        </Typography>
                        <Typography sx={{ fontSize: { xs: 30, md: 42 }, fontWeight: 700, lineHeight: 1.1 }}>
                            Itt követheted a diákjaid munkáját és oszthatsz ki feladatokat
                        </Typography>
                        <Typography sx={{ fontSize: 16, color: "text.secondary", textWrap: "pretty" }}>
                            Ez az oldal a tanári munka központja: itt kezeled a felügyelt osztályokat, feladatokat oszthatsz ki a diákoknak, és nyomon követheted, hogyan haladnak a kiosztott anyagokkal.
                        </Typography>
                    </Stack>
                    <Box
                        component="img"
                        src="/teacher.png"
                        alt="Tanári osztálykezelés illusztráció"
                        sx={{
                            width: { xs: "100%", md: 280 },
                            maxWidth: 320,
                            display: { xs: "none", md: "block" }
                        }}
                    />
                </Stack>

                <Stack gap={1.25}>
                    <Feature text="Feladatok kiosztása a felügyelt osztályoknak" />
                    <Feature text="Tanulói haladás és aktivitási állapot áttekintése" />
                    <Feature text="Osztályok kezelése egy tanári felületen" />
                </Stack>

                <CreateClass CTA={true} />
            </Stack>
        </Paper>
    )
}

export default Landing