import Footer from "@/components/footer/Footer";
import { Logo } from "@/components/ui/logo";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

const Page: FC<{}> = () => {

    return (
        <Stack>
            <Stack direction="row" sx={{ width: "100%", px: 4, justifyContent: "center" }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: 1300, maxWidth: "100%", }} >

                    <Logo />
                    <Stack direction="row" gap={2} >
                        <Button component={Link} href="/login" variant="outlined" color="button" size="large" sx={{ width: 200 }}>
                            Belépés
                        </Button>

                    </Stack>
                </Stack>


            </Stack>


            <Stack gap={12}>
                <Stack gap={4} sx={{
                    pt: 12, px: 4, width: "100%", flexDirection: { xs: "column-reverse", md: "row" }
                }}>
                    <Stack sx={{ flex: { xs: 1, md: 0.5 }, alignItems: "flex-end" }}>
                        <Stack sx={{ width: { xs: "100%", md: 600 }, gap: 6, }}>
                            <Typography sx={({
                                fontSize: 60, fontWeight: 600, lineHeight: 1.2, background: "linear-gradient(90deg, #3CC8AF 0%, #3CC8F4 100%)",
                                backgroundClip: "text",
                                textFillColor: "transparent",
                                textDecoration: "none",
                            })}>
                                Tanulj szavakat okosan a Lexoval!
                            </Typography>
                            <Typography sx={({ fontSize: 20, fontWeight: 500, textAlign: "justify", textWrap: "pretty" })}>
                                Készíts saját szógyűjteményt, gyakorolj hatékonyan kártyákkal és tesztekkel, kövesd a fejlődésedet bárhol, bármikor.
                            </Typography>
                            <Button variant="contained" color="button" sx={{ width: "fit-content", fontSize: 20, fontWeight: 400 }} size="large">Kezdjük el!</Button>


                        </Stack>

                    </Stack>
                    <Stack sx={{ flex: { xs: 1, md: 0.5 } }}>
                        <Box component={"img"} src="/hero.png" width={{ xs: "100%", md: 500 }} display={{ xs: "none", md: "block" }} />

                    </Stack>


                </Stack>

                <Divider flexItem />
                <Stack justifyContent={"space-between"} sx={{ width: 1200, maxWidth: "100%", mx: "auto", pb: 4, alignItems: { xs: "center", sm: "flex-start" }, flexDirection: { xs: "column", sm: "row" } }} gap={4}>
                    <Stack alignItems="center" gap={2} width={300}>
                        <Box component={"img"} src="/books.png" width={160} />
                        <Typography sx={{ fontSize: 30, fontWeight: 600, textAlign: "center" }}>Személyre szabható tanulás</Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: 500, textAlign: "center" }}>Hozz létre saját szógyűjteményeket több nyelven</Typography>

                    </Stack>
                    <Stack alignItems="center" gap={2} width={300}>
                        <Box component={"img"} src="/stats.png" width={160} />
                        <Typography sx={{ fontSize: 25, fontWeight: 600, textAlign: "center" }}>Fejlődéskövetés</Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: 500, textAlign: "center" }}>Pontozási rendszer és statisztikák segítenek a haladásban </Typography>


                    </Stack>
                    <Stack alignItems="center" gap={2} width={300}>
                        <Box component={"img"} src="/translation.png" width={160} />
                        <Typography sx={{ fontSize: 25, fontWeight: 600, textAlign: "center" }}>Fordítási javaslatok</Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: 500, textAlign: "center" }}>Automatikus nyelvfelismerés, fordítási javslat és felovasás.</Typography>

                    </Stack>
                </Stack>
            </Stack>
            <Divider flexItem />

            <Stack sx={{ py: 8, px: 4, width: "100%", alignItems: "center" }}>
                <Typography sx={{ fontSize: 40, fontWeight: 600, mb: 6 }}>Árak és csomagok</Typography>
                <Stack direction={{ xs: "column", md: "row" }} gap={4} sx={{ width: 1200, maxWidth: "100%", justifyContent: "center" }}>
                    <Stack sx={{ border: "1px solid #ccc", borderRadius: 2, p: 4, width: 300, alignItems: "center", gap: 2 }}>
                        <Typography sx={{ fontSize: 30, fontWeight: 600 }}>Ingyenes</Typography>
                        <Typography sx={{ fontSize: 20, textAlign: "center" }}>Alapvető funkciók elérhetők díjmentesen.</Typography>
                        <Typography sx={{ fontSize: 16, textAlign: "center" }}>• Saját szógyűjtemények létrehozása</Typography>
                        <Typography sx={{ fontSize: 16, textAlign: "center" }}>• Kártyás gyakorlás</Typography>
                        <Typography sx={{ fontSize: 16, textAlign: "center" }}>• Alap statisztikák</Typography>
                        <Button variant="outlined" color="button" size="large">Kezdj ingyen</Button>
                    </Stack>
                    <Stack sx={{ border: "1px solid #ccc", background: "linear-gradient(90deg, #3CC8AF 0%, #3CC8F4 100%)", color: "white", borderRadius: 2, p: 4, width: 300, alignItems: "center", gap: 2 }}>
                        <Typography sx={{ fontSize: 30, fontWeight: 600 }}>Plusz</Typography>
                        <Typography sx={{ fontSize: 20, textAlign: "center" }}>Prémium funkciók a hatékonyabb tanuláshoz.</Typography>
                        <Typography sx={{ fontSize: 16, textAlign: "center" }}>• Minden ingyenes funkció</Typography>
                        <Typography sx={{ fontSize: 16, textAlign: "center" }}>• Haladó statisztikák</Typography>
                        <Typography sx={{ fontSize: 16, textAlign: "center" }}>• Fordítási javaslatok</Typography>
                        <Typography sx={{ fontSize: 16, textAlign: "center" }}>• Reklámmentes élmény</Typography>
                        <Button variant="contained" color="button" size="large">Váltás Pluszra</Button>
                    </Stack>
                </Stack>
            </Stack>

            <Footer />

        </Stack >
    )
}

export default Page