import {
    Box,
    Chip,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material"
import { Search, Sparkles } from "lucide-react"
import { FC } from "react"
import { TeacherOverview } from "../../types"
import MetricCard from "../MetricCard"
import CreateClass from "./CreateClass"
import TeacherClassCard from "./TeacherClassCard"


const OverviewDashboard: FC<{ teacherOverview: TeacherOverview }> = ({ teacherOverview }) => {

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
                                    Osztályok
                                </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 700, lineHeight: 1.1 }}>
                                Tanári dashboard
                            </Typography>
                            <Typography sx={{ maxWidth: 720, color: "text.secondary", fontSize: 16 }}>
                                Az osztalyokat gyorsan at lehet nezni: letszam, aktiv feladatok, kozelgo hataridok es haladas egy helyen.
                            </Typography>
                        </Stack>

                        <CreateClass CTA />
                    </Stack>

                    <Stack
                        direction={{ xs: "column", lg: "row" }}
                        gap={2}
                        alignItems={{ xs: "stretch", lg: "center" }}
                    >
                        <TextField
                            placeholder="Keresés osztálynév alapján"
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
                            <Chip label="Összes" sx={{ bgcolor: "text.primary", color: "background.paper", fontWeight: 700 }} />
                            <Chip label="Aktív" sx={{ bgcolor: "#dcfce7", color: "#166534", fontWeight: 700 }} />
                            <Chip label="Lejáró feladattal" sx={{ bgcolor: "#fef3c7", color: "#92400e", fontWeight: 700 }} />
                            <Chip label="Archivált" sx={{ bgcolor: "#e2e8f0", color: "#475569", fontWeight: 700 }} />
                        </Stack>
                    </Stack>

                    <Stack direction={{ xs: "column", md: "row" }} gap={2}>
                        <MetricCard value={teacherOverview.activeClasses.toString()} label="Aktív osztály" />
                        <MetricCard value={teacherOverview.dueThisWeekNumber.toString()} label="Lejáró határidő ezen a héten" />
                        <MetricCard value={teacherOverview.progress.toString() + "%"} label="Átlagos haladás" />
                    </Stack>
                </Stack>
            </Paper>
            <Stack gap={2.5}>
                <Stack gap={0.75}>
                    <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 700 }}>
                        Felügyelt osztályok
                    </Typography>
                    <Typography sx={{ color: "text.secondary", maxWidth: 760 }}>
                        Azok az osztályok, amelyeket te kezelsz vagy tanárkent felügyelsz.
                    </Typography>
                </Stack>

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

                    {teacherOverview.classes.map((classData) => (
                        <TeacherClassCard key={classData.id} classData={classData} />
                    ))}
                </Box>

            </Stack>

        </Stack>
    )
}



export default OverviewDashboard
