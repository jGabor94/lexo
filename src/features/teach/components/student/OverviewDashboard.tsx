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
import { StudentOverview } from "../../types"
import MetricCard from "../MetricCard"
import StudentClassCard from "./StudentClassCard"

const OverviewDashboard: FC<{ studentOverview: StudentOverview }> = async ({ studentOverview }) => {

    return (
        <Stack gap={4} sx={{ px: { xs: 2, md: 4 }, pb: 10 }}>
            <Paper
                sx={{
                    overflow: "hidden",
                    border: "none"
                }}
            >
                <Stack gap={3} sx={{ p: { xs: 2.5, md: 4 } }}>
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
                                Tanuloi dashboard
                            </Typography>
                            <Typography sx={{ maxWidth: 720, color: "text.secondary", fontSize: 16 }}>
                                A csatlakozott osztalyaid, kiosztott feladataid es kovetkezo hataridok egy helyen.
                            </Typography>
                        </Stack>
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
                            <Chip label="Aktiv feladattal" sx={{ bgcolor: "#dcfce7", color: "#166534", fontWeight: 700 }} />
                            <Chip label="Hatarido szerint" sx={{ bgcolor: "#fef3c7", color: "#92400e", fontWeight: 700 }} />
                        </Stack>
                    </Stack>

                    <Stack direction={{ xs: "column", md: "row" }} gap={2}>
                        <MetricCard value={String(studentOverview.classes.length)} label="Osztalyok száma" />
                        <MetricCard value={String(studentOverview.activeAssignmentsNumber)} label="Kiosztott feladat" />
                        <MetricCard value={studentOverview.nextAssignment ? studentOverview.nextAssignment.className : "Nincs"} label="Kovetkezo teendo" />
                    </Stack>
                </Stack>
            </Paper>

            <Stack gap={2.5}>
                <Stack gap={0.75}>
                    <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 700 }}>
                        Osztalyaid
                    </Typography>
                    <Typography sx={{ color: "text.secondary", maxWidth: 760 }}>
                        Azok az osztalyok, amelyekhez tanulokent csatlakoztal.
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

                    {studentOverview.classes.map((item) => (
                        <StudentClassCard key={item.id} classData={item} />
                    ))}
                </Box>
            </Stack>
        </Stack>
    )
}


export default OverviewDashboard
