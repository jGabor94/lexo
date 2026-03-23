"use client"

import {
    Avatar,
    Box,
    Button,
    Chip,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material"
import { ArrowRight, GraduationCap, Search, Sparkles } from "lucide-react"
import { FC, ReactNode } from "react"
import { ClassListItem } from "../types"
import ClassCard from "./ClassCard"

const ClassListPreview: FC<{ classes: ClassListItem[] }> = async ({ classes }) => {

    return (
        <Stack gap={4} sx={{ px: { xs: 2, md: 4 }, pb: 10 }}>
            <Paper
                sx={{
                    overflow: "hidden",
                    borderRadius: 6,
                    background: "linear-gradient(135deg, rgba(60,200,175,0.14) 0%, rgba(60,200,244,0.18) 100%)",
                    borderColor: "rgba(60, 200, 175, 0.28)"
                }}
            >
                <Stack
                    gap={3}
                    sx={{
                        p: { xs: 2.5, md: 4 },
                    }}
                >
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        gap={2}
                    >
                        <Stack gap={1}>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Sparkles size={18} />
                                <Typography sx={{ fontSize: 14, fontWeight: 700, letterSpacing: 0.4 }}>
                                    Osztalyok
                                </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 700, lineHeight: 1.1 }}>
                                Tanari dashboard jellegu kartyas lista
                            </Typography>
                            <Typography sx={{ maxWidth: 720, color: "text.secondary", fontSize: 16 }}>
                                Az osztalyokat gyorsan at lehet nezni: letszam, aktiv feladatok, kozelgo hataridok es haladas egy helyen.
                            </Typography>
                        </Stack>

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ borderRadius: 3, px: 2.5, py: 1.25, fontSize: 16 }}
                        >
                            Uj osztaly
                        </Button>
                    </Stack>

                    <Stack
                        direction={{ xs: "column", lg: "row" }}
                        gap={2}
                        alignItems={{ xs: "stretch", lg: "center" }}
                    >
                        <TextField
                            placeholder="Kereses osztalynev alapjan"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={18} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                maxWidth: { lg: 420 },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 4,
                                    bgcolor: "background.paper",
                                }
                            }}
                        />

                        <Stack direction="row" gap={1} sx={{ flexWrap: "wrap" }}>
                            <Chip label="Osszes" sx={{ bgcolor: "text.primary", color: "background.paper", fontWeight: 700 }} />
                            <Chip label="Aktiv" sx={{ bgcolor: "#dcfce7", color: "#166534", fontWeight: 700 }} />
                            <Chip label="Lejaro feladattal" sx={{ bgcolor: "#fef3c7", color: "#92400e", fontWeight: 700 }} />
                            <Chip label="Archivalt" sx={{ bgcolor: "#e2e8f0", color: "#475569", fontWeight: 700 }} />
                        </Stack>
                    </Stack>

                    <Stack direction={{ xs: "column", md: "row" }} gap={2}>
                        <MetricCard value="12" label="Aktiv osztaly" />
                        <MetricCard value="4" label="Lejaro hatarido ezen a heten" />
                        <MetricCard value="86%" label="Atlagos kezdesi arany" />
                    </Stack>
                </Stack>
            </Paper>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, minmax(0, 1fr))",
                        xl: "repeat(3, minmax(0, 1fr))"
                    },
                    gap: 3
                }}
            >
                <CreateCard />
                {classes.map((item) => (
                    <ClassCard key={item.id} item={item} />
                ))}
            </Box>
        </Stack>
    )
}

const MetricCard: FC<{ value: string, label: string }> = ({ value, label }) => (
    <Paper
        sx={{
            flex: 1,
            borderRadius: 4,
            p: 2.25,
            bgcolor: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(12px)"
        }}
    >
        <Typography sx={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{value}</Typography>
        <Typography sx={{ mt: 0.75, color: "text.secondary", fontWeight: 500 }}>{label}</Typography>
    </Paper>
)

const CreateCard: FC = () => (
    <Paper
        sx={{
            minHeight: 320,
            p: 3,
            borderRadius: 6,
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: "rgba(60, 200, 244, 0.32)",
            //background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(236,254,255,0.95) 100%)",
        }}
    >
        <Stack justifyContent="space-between" sx={{ height: "100%" }}>
            <Stack gap={2}>
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 4,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "rgba(60,200,244,0.14)"
                    }}
                >
                    <GraduationCap size={26} />
                </Box>
                <Stack gap={1}>
                    <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                        Uj osztaly letrehozasa
                    </Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: 15.5 }}>
                        Adj nevet az osztalynak, hivj meg kollegakat, majd oszd ki az elso set-et egy hataridovel.
                    </Typography>
                </Stack>
            </Stack>

            <Stack gap={1.5}>
                <Button variant="contained" color="primary" sx={{ borderRadius: 3 }}>
                    Letrehozas
                </Button>
                <Button variant="text" endIcon={<ArrowRight size={16} />} sx={{ justifyContent: "flex-start" }}>
                    Minta workflow megnezese
                </Button>
            </Stack>
        </Stack>
    </Paper>
)



const InfoPill: FC<{ icon: ReactNode, text: string }> = ({ icon, text }) => (
    <Stack
        direction="row"
        alignItems="center"
        gap={0.75}
        sx={{
            px: 1.25,
            py: 0.75,
            borderRadius: 999,
            bgcolor: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(148, 163, 184, 0.18)"
        }}
    >
        {icon}
        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{text}</Typography>
    </Stack>
)

const AvatarGroup: FC = () => (
    <Stack direction="row">
        {["AK", "BN", "CS"].map((label, index) => (
            <Avatar
                key={label}
                sx={{
                    width: 34,
                    height: 34,
                    fontSize: 13,
                    fontWeight: 700,
                    ml: index === 0 ? 0 : -1,
                    border: "2px solid white",
                    bgcolor: index === 0 ? "#0f766e" : index === 1 ? "#0284c7" : "#7c3aed"
                }}
            >
                {label}
            </Avatar>
        ))}
    </Stack>
)

export default ClassListPreview
