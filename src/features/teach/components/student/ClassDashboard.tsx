import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Chip,
    LinearProgress,
    Paper,
    Stack,
    Typography
} from "@mui/material"
import {
    ArrowRight,
    BookOpen,
    CalendarClock,
    CheckCircle2,
    ClipboardList,
    Clock3,
    GraduationCap,
    Sparkles,
    Target
} from "lucide-react"
import Link from "next/link"
import { FC, ReactNode } from "react"
import type { StudentClassOverview } from "../../types"


const StudentClassDashboard: FC<{ studentClassOverview: StudentClassOverview }> = async ({ studentClassOverview }) => {

    return (
        <Stack gap={4} sx={{ px: { xs: 2, md: 4 }, pb: 10, pt: { xs: 3, md: 5 } }}>
            <Paper
                sx={{
                    p: { xs: 2.5, md: 4 },
                    borderRadius: 6,
                    border: "none",
                    color: "white",
                    overflow: "hidden",
                    position: "relative"
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none"
                    }}
                />
                <Stack gap={3} sx={{ position: "relative" }}>
                    <Stack
                        direction={{ xs: "column", lg: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", lg: "center" }}
                        gap={3}
                    >
                        <Stack gap={1.5} sx={{ maxWidth: 760 }}>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Sparkles size={18} />
                                <Typography sx={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.6 }}>
                                    TANULOI OSZTALY
                                </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: { xs: 30, md: 42 }, fontWeight: 800, lineHeight: 1.05 }}>
                                {studentClassOverview.name}
                            </Typography>
                            <Typography sx={{ color: "rgba(255,255,255,0.78)", maxWidth: 760, fontSize: 16 }}>
                                {studentClassOverview.description || "Itt latod az osztalyhoz kiosztott feladataidat, a hataridoket es a sajat haladasodat."}
                            </Typography>
                        </Stack>

                        <Stack gap={1.5} sx={{ minWidth: { lg: 300 }, width: { xs: "100%", lg: "auto" } }}>
                            <Stack direction="row" gap={1} sx={{ flexWrap: "wrap" }}>
                                <Chip label="Tanuloi nezet" sx={{ bgcolor: "rgba(134,239,172,0.18)", color: "#dcfce7", fontWeight: 700 }} />
                                <Chip label="Feladatkovetes" sx={{ bgcolor: "rgba(125,211,252,0.18)", color: "#e0f2fe", fontWeight: 700 }} />
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <CalendarClock size={16} />
                                <Typography sx={{ color: "rgba(255,255,255,0.82)" }}>
                                    Kovetkezo hatarido: {studentClassOverview.nextAssignment ? new Intl.DateTimeFormat("hu-HU", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(studentClassOverview.nextAssignment.deadline)) : "Nincs aktiv feladat"}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <AvatarGroup max={4}>
                                    {(studentClassOverview.teachers || []).map((teacher, index) => (
                                        <Avatar
                                            key={`${teacher.name}-${index}`}
                                            src={teacher.image || undefined}
                                            alt={teacher.name || "Tanar"}
                                            sx={{ width: 34, height: 34 }}
                                        >
                                            {teacher.name?.slice(0, 1) || "T"}
                                        </Avatar>
                                    ))}
                                </AvatarGroup>
                                <Typography sx={{ color: "rgba(255,255,255,0.82)" }}>
                                    {(studentClassOverview.teachers || []).length} tanar ebben az osztalyban
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack direction={{ xs: "column", md: "row" }} gap={2}>
                        <MetricCard icon={<ClipboardList size={18} />} value={`${studentClassOverview.tasks.length}`} label="Osszes feladat" />
                        <MetricCard icon={<Target size={18} />} value={`${studentClassOverview.activeAssignmentsNumber}`} label="Aktiv feladat" />
                        <MetricCard icon={<CheckCircle2 size={18} />} value={`${studentClassOverview.completedAssignmentsNumber}`} label="Befejezett" />
                        <MetricCard icon={<GraduationCap size={18} />} value={`${studentClassOverview.progress}%`} label="Atlagos haladas" />
                    </Stack>
                </Stack>
            </Paper>

            <Stack direction={{ xs: "column", xl: "row" }} gap={3} alignItems="stretch">
                <Paper sx={{ p: { xs: 2.5, md: 3 }, border: "none", flex: 1.35 }}>
                    <Stack gap={2.5}>
                        <Stack gap={0.5}>
                            <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                                Feladataid
                            </Typography>
                            <Typography sx={{ color: "text.secondary" }}>
                                Minden kiosztott feladat, hatarido es kapcsolodo gyujtemeny az osztalybol.
                            </Typography>
                        </Stack>

                        <Stack gap={2}>
                            {studentClassOverview.tasks.length === 0 && (
                                <Paper
                                    variant="outlined"
                                    sx={{ p: 2.25, borderRadius: 4, borderColor: "rgba(148, 163, 184, 0.28)" }}
                                >
                                    <Typography sx={{ fontWeight: 700 }}>
                                        Meg nincs kiosztott feladat.
                                    </Typography>
                                    <Typography sx={{ color: "text.secondary" }}>
                                        Amint a tanárod kioszt valamit, itt jelenik meg.
                                    </Typography>
                                </Paper>
                            )}

                            {studentClassOverview.tasks.map((assignment) => (
                                <Paper
                                    key={assignment.id}
                                    variant="outlined"
                                    sx={{ p: 2.25, borderRadius: 4, borderColor: "rgba(148, 163, 184, 0.28)" }}
                                >
                                    <Stack gap={1.75}>
                                        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" gap={1.5}>
                                            <Stack gap={0.75}>
                                                <Chip
                                                    label={assignment.stats.isCompleted ? "Befejezett" : assignment.isExpired ? "Lejart" : "Aktiv"}
                                                    size="small"
                                                    sx={{
                                                        width: "fit-content",
                                                        fontWeight: 700,
                                                        bgcolor: assignment.stats.isCompleted
                                                            ? "#dcfce7"
                                                            : assignment.isExpired
                                                                ? "#fee2e2"
                                                                : "#e0f2fe",
                                                        color: assignment.stats.isCompleted

                                                            ? "#166534"
                                                            : assignment.isExpired
                                                                ? "#b91c1c"
                                                                : "#0c4a6e"
                                                    }}
                                                />
                                                <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                                                    {assignment.title}
                                                </Typography>
                                                {assignment.description && (
                                                    <Typography sx={{ color: "text.secondary" }}>
                                                        {assignment.description}
                                                    </Typography>
                                                )}
                                            </Stack>
                                            <Stack direction="row" gap={0.75} alignItems="center" sx={{ alignSelf: { md: "flex-start" } }}>
                                                <Clock3 size={14} />
                                                <Typography sx={{ fontWeight: 700 }}>
                                                    {new Intl.DateTimeFormat("hu-HU", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(assignment.deadline))}
                                                </Typography>
                                            </Stack>
                                        </Stack>

                                        <Stack gap={1}>
                                            <Stack direction="row" justifyContent="space-between" gap={2}>
                                                <Typography sx={{ color: "text.secondary", fontWeight: 500 }}>
                                                    Sajat elorehaladas
                                                </Typography>
                                                <Typography sx={{ fontWeight: 700 }}>
                                                    {assignment.stats.progress}%
                                                </Typography>
                                            </Stack>
                                            <LinearProgress
                                                variant="determinate"
                                                value={assignment.stats.progress}
                                                sx={{
                                                    height: 10,
                                                    borderRadius: 999,
                                                    bgcolor: "rgba(148, 163, 184, 0.18)",
                                                    "& .MuiLinearProgress-bar": {
                                                        borderRadius: 999,
                                                        background: "linear-gradient(90deg, #0f766e 0%, #38bdf8 100%)"
                                                    }
                                                }}
                                            />
                                        </Stack>

                                        <Stack direction="row" gap={1} sx={{ flexWrap: "wrap" }}>
                                            {assignment.sets.length === 0 && (
                                                <QuickPill icon={<BookOpen size={14} />} text="Nincs kapcsolt gyujtemeny" />
                                            )}
                                            {assignment.sets.map((set) => (
                                                <Button
                                                    key={set.id}
                                                    component={Link}
                                                    href={`/sets/${set.id}/task/${assignment.id}`}
                                                    variant="contained"
                                                    color="button"
                                                    endIcon={<ArrowRight size={16} />}
                                                    sx={{ borderRadius: 3 }}
                                                >
                                                    {set.completed && <CheckCircleIcon sx={{ mr: 1 }} />}
                                                    {set.name}
                                                </Button>
                                            ))}
                                        </Stack>
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>
                    </Stack>
                </Paper>

                <Stack gap={3} sx={{ flex: 0.85 }}>
                    <Paper sx={{ p: { xs: 2.5, md: 3 }, border: "none" }}>
                        <Stack gap={1} >
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography sx={{ fontSize: 22, fontWeight: 500 }}>
                                    Haladásod
                                </Typography>
                                <Typography sx={{ fontWeight: 700 }}>
                                    {studentClassOverview.progress}%
                                </Typography>
                            </Stack>

                            <LinearProgress
                                variant="determinate"
                                value={studentClassOverview.progress}
                                sx={{
                                    height: 12,
                                    borderRadius: 999,
                                    bgcolor: "rgba(148, 163, 184, 0.18)",
                                    "& .MuiLinearProgress-bar": {
                                        borderRadius: 999,
                                        background: "linear-gradient(90deg, #0f766e 0%, #38bdf8 100%)"
                                    }
                                }}
                            />

                        </Stack>
                    </Paper>

                    <Paper sx={{ p: { xs: 2.5, md: 3 }, border: "none" }}>
                        <Stack gap={1.5}>
                            <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
                                Tanarok
                            </Typography>
                            {(studentClassOverview.teachers || []).map((teacher, index) => (
                                <Stack key={`${teacher.email}-${index}`} direction="row" alignItems="center" gap={1.5}>
                                    <Avatar src={teacher.image || undefined} alt={teacher.name || "Tanar"}>
                                        {teacher.name?.slice(0, 1) || "T"}
                                    </Avatar>
                                    <Stack>
                                        <Typography sx={{ fontWeight: 700 }}>
                                            {teacher.name || "Tanar"}
                                        </Typography>
                                        <Typography sx={{ color: "text.secondary" }}>
                                            {teacher.email}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: { xs: 2.5, md: 3 }, border: "none" }}>
                        <Stack gap={1.5}>
                            <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
                                Gyors fokusz
                            </Typography>
                            <ActionRow title="Kovetkezo lepes" description={studentClassOverview.nextAssignment ? studentClassOverview.nextAssignment.name : "Nincs aktiv feladatod ebben az osztalyban."} />
                            <ActionRow title="Gyakorlas" description="Nyisd meg a feladatokhoz kapcsolt gyujtemenyeket, es folytasd ott, ahol abbahagytad." />
                        </Stack>
                    </Paper>
                </Stack>
            </Stack >
        </Stack >
    )
}

const MetricCard: FC<{ icon: ReactNode, value: string, label: string }> = ({ icon, value, label }) => (
    <Paper
        sx={{
            flex: 1,
            p: 2.25,
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.08)",
            color: "white",
            backdropFilter: "blur(12px)"
        }}
    >
        <Stack gap={1}>
            <Stack direction="row" alignItems="center" gap={1}>
                {icon}
                <Typography sx={{ color: "rgba(255,255,255,0.72)", fontWeight: 600 }}>{label}</Typography>
            </Stack>
            <Typography sx={{ fontSize: 30, fontWeight: 800, lineHeight: 1 }}>{value}</Typography>
        </Stack>
    </Paper>
)

const QuickPill: FC<{ icon: ReactNode, text: string }> = ({ icon, text }) => (
    <Stack
        direction="row"
        alignItems="center"
        gap={0.75}
        sx={{
            px: 1.25,
            py: 0.75,
            borderRadius: 999,
            bgcolor: "rgba(15, 23, 42, 0.04)"
        }}
    >
        {icon}
        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{text}</Typography>
    </Stack>
)

const ActionRow: FC<{ title: string, description: string }> = ({ title, description }) => (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 4, borderColor: "rgba(148, 163, 184, 0.24)" }}>
        <Stack gap={0.5}>
            <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
            <Typography sx={{ color: "text.secondary" }}>{description}</Typography>
        </Stack>
    </Paper>
)

export default StudentClassDashboard
