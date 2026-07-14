import Feature from '@/components/ui/Future'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { MailCheck } from 'lucide-react'
import { FC } from 'react'

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
                            TANULO
                        </Typography>
                        <Typography sx={{ fontSize: { xs: 30, md: 42 }, fontWeight: 700, lineHeight: 1.1 }}>
                            Csatlakozz egy osztalyhoz, es tartsd egy helyen a feladataidat
                        </Typography>
                        <Typography sx={{ fontSize: 16, color: "text.secondary", textWrap: "pretty" }}>
                            Ha a tanarod meghivott egy osztalyba, a meghivo elfogadasa utan itt fogod latni a kiosztott tananyagokat, hataridoket es a gyakorlasi lehetosegeket.
                        </Typography>
                    </Stack>
                    <Box
                        component="img"
                        src="/education.png"
                        alt="Tanuloi osztaly dashboard illusztracio"
                        sx={{
                            width: { xs: "100%", md: 220 },
                            maxWidth: 280,
                            display: { xs: "none", md: "block" }
                        }}
                    />
                </Stack>

                <Stack gap={1.25}>
                    <Feature text="Osztalyfeladatok es hataridok attekintese" />
                    <Feature text="Kiosztott szogyujtemenyek gyors megnyitasa" />
                    <Feature text="Tanarokkal es osztalyokkal kapcsolatos informaciok egy helyen" />
                </Stack>

                <Button
                    variant="contained"
                    color="button"
                    startIcon={<MailCheck size={18} />}
                    sx={{ width: "fit-content", borderRadius: 3 }}
                    disabled
                >
                    Varj a tanari meghivora
                </Button>
            </Stack>
        </Paper>
    )
}

export default Landing
