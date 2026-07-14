import type { SetListItem } from "@/features/set/types"
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Chip,
    Divider,
    LinearProgress,
    Paper,
    Stack,
    Typography
} from "@mui/material"
import {
    BookOpen,
    CalendarClock,
    CheckCircle2,
    ClipboardList,
    Clock3,
    Copy,
    Eye,
    GraduationCap,
    Link2,
    MailPlus,
    MessageSquare,
    Sparkles,
    Users
} from "lucide-react"
import { FC, ReactNode } from "react"
import type { Class } from "../../types"
import CreateTask from "./CreateTask"
import InviteForm from "./InviteForm"


const mockFeed = [
    { id: "f1", title: "11 diak mar leadta a Past simple gyakorlolapot", meta: "15 perce", tone: "success" },
    { id: "f2", title: "3 diaknal kozel a hatarido, de meg nem kezdtek el a feladatot", meta: "1 oraja", tone: "warning" },
    { id: "f3", title: "Uj visszajelzes erkezett a 2/B csoporttol az elozo quizrol", meta: "Ma 09:12", tone: "info" },
] as const

const ClassDashboard: FC<{ classData: Class, ownSets: SetListItem[] }> = ({ classData, ownSets }) => {
    const totalStudents = classData.students.length
    const activeAssignments = classData.tasks.length
    const averageProgress = 76
    const pendingReviews = 5
    const assignments = classData.tasks.map((task) => ({
        id: task.id,
        title: task.name,
        status: new Date(task.deadline).getTime() < Date.now() ? "Lejart" : "Aktiv",
        dueLabel: new Intl.DateTimeFormat("hu-HU", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(task.deadline)),
        started: 0,
        completed: 0,
        total: totalStudents,
        sets: task.sets
    }))

    return (
        <Stack gap={4} sx={{ px: { xs: 2, md: 4 }, pb: 10, pt: { xs: 3, md: 5 } }}>
            <Paper
                sx={{
                    p: { xs: 2.5, md: 4 },
                    borderRadius: 6,
                    background: "linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(14,116,144,0.92) 100%)",
                    color: "white",
                    overflow: "hidden",
                    position: "relative"
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: "radial-gradient(circle at top right, rgba(255,255,255,0.16), transparent 34%)",
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
                                    TANARI DASHBOARD
                                </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: { xs: 30, md: 42 }, fontWeight: 800, lineHeight: 1.05 }}>
                                {classData.name}
                            </Typography>
                            <Typography sx={{ color: "rgba(255,255,255,0.78)", maxWidth: 760, fontSize: 16 }}>
                                {classData.description || "Itt kovetheted a kiosztott feladatokat, a diakok aktivitasi szintjet es a teljes osztaly haladasat."}
                            </Typography>
                        </Stack>

                        <Stack gap={1.5} sx={{ minWidth: { lg: 300 }, width: { xs: "100%", lg: "auto" } }}>
                            <Stack direction="row" gap={1} sx={{ flexWrap: "wrap" }}>
                                <Chip label="Aktiv osztaly" sx={{ bgcolor: "rgba(134,239,172,0.18)", color: "#dcfce7", fontWeight: 700 }} />
                                <Chip label="Heti celkovetes" sx={{ bgcolor: "rgba(125,211,252,0.18)", color: "#e0f2fe", fontWeight: 700 }} />
                            </Stack>
                            <Stack direction={{ xs: "column", sm: "row" }} gap={1.25}>
                                <InviteForm classData={classData} type="teacher" />

                                <CreateTask classData={classData} ownSets={ownSets} variant="outlined" />
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <CalendarClock size={16} />
                                <Typography sx={{ color: "rgba(255,255,255,0.82)" }}>
                                    Kovetkezo hatarido: {assignments[0]?.dueLabel || "Nincs megadva"}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <AvatarGroup max={4}>
                                    {(classData.teachers || []).map((teacher, index) => (
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
                                    {(classData.teachers || []).length} tanar koveti ezt az osztalyt
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack direction={{ xs: "column", md: "row" }} gap={2}>
                        <MetricCard icon={<Users size={18} />} value={`${totalStudents}`} label="Aktiv diak" />
                        <MetricCard icon={<ClipboardList size={18} />} value={`${activeAssignments}`} label="Futo feladat" />
                        <MetricCard icon={<GraduationCap size={18} />} value={`${averageProgress}%`} label="Atlagos haladas" />
                        <MetricCard icon={<CheckCircle2 size={18} />} value={`${pendingReviews}`} label="Varakozo atnezes" />
                    </Stack>
                </Stack>
            </Paper>

            <Stack direction={{ xs: "column", xl: "row" }} gap={3} alignItems="stretch">
                <Paper sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 5, flex: 1.25 }}>
                    <Stack gap={2.5}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
                            <Stack gap={0.5}>
                                <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                                    Aktiv feladatok
                                </Typography>
                                <Typography sx={{ color: "text.secondary" }}>
                                    Az osztalyhoz kiosztott gyujtemenyek es hataridok.
                                </Typography>
                            </Stack>
                            <CreateTask classData={classData} ownSets={ownSets} />
                        </Stack>

                        <Stack gap={2}>
                            {assignments.length === 0 && (
                                <Paper
                                    variant="outlined"
                                    sx={{ p: 2.25, borderRadius: 4, borderColor: "rgba(148, 163, 184, 0.28)" }}
                                >
                                    <Typography sx={{ fontWeight: 700 }}>
                                        Meg nincs kiosztott feladat.
                                    </Typography>
                                    <Typography sx={{ color: "text.secondary" }}>
                                        Az Uj kiosztas gombbal valaszthatsz gyujtemenyeket a sajat konyvtaradbol.
                                    </Typography>
                                </Paper>
                            )}

                            {assignments.map((assignment) => {
                                const progressValue = assignment.total > 0 ? Math.round((assignment.completed / assignment.total) * 100) : 0

                                return (
                                    <Paper
                                        key={assignment.id}
                                        variant="outlined"
                                        sx={{ p: 2.25, borderRadius: 4, borderColor: "rgba(148, 163, 184, 0.28)" }}
                                    >
                                        <Stack gap={1.5}>
                                            <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" gap={1.5}>
                                                <Stack gap={0.75}>
                                                    <Chip
                                                        label={assignment.status}
                                                        size="small"
                                                        sx={{
                                                            width: "fit-content",
                                                            fontWeight: 700,
                                                            bgcolor: assignment.status === "Figyelmet ker"
                                                                ? "#fef3c7"
                                                                : assignment.status === "Tervezett"
                                                                    ? "#e0f2fe"
                                                                    : "#dcfce7",
                                                            color: assignment.status === "Figyelmet ker"
                                                                ? "#92400e"
                                                                : assignment.status === "Tervezett"
                                                                    ? "#0c4a6e"
                                                                    : "#166534"
                                                        }}
                                                    />
                                                    <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                                                        {assignment.title}
                                                    </Typography>
                                                </Stack>
                                                <Stack gap={0.75} alignItems={{ xs: "flex-start", md: "flex-end" }}>
                                                    <Stack direction="row" gap={0.75} alignItems="center">
                                                        <Clock3 size={14} />
                                                        <Typography sx={{ fontWeight: 700 }}>
                                                            Hatarido: {assignment.dueLabel}
                                                        </Typography>
                                                    </Stack>
                                                    <Typography sx={{ color: "text.secondary" }}>
                                                        {assignment.started}/{assignment.total} diak kezdte el
                                                    </Typography>
                                                </Stack>
                                            </Stack>

                                            <Stack gap={1}>
                                                <Stack direction="row" justifyContent="space-between" gap={2}>
                                                    <Typography sx={{ color: "text.secondary", fontWeight: 500 }}>
                                                        Befejezett megoldasok
                                                    </Typography>
                                                    <Typography sx={{ fontWeight: 700 }}>
                                                        {assignment.completed}/{assignment.total}
                                                    </Typography>
                                                </Stack>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={progressValue}
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
                                                <QuickPill icon={<BookOpen size={14} />} text={`${assignment.sets.length} gyujtemeny`} />
                                                <QuickPill icon={<Eye size={14} />} text="Tanari attekintes" />
                                                <QuickPill icon={<MessageSquare size={14} />} text="Visszajelzes kuldese" />
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                )
                            })}
                        </Stack>
                    </Stack>
                </Paper>

                <Stack gap={3} sx={{ flex: 0.85 }}>
                    <Paper sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 5 }}>
                        <Stack gap={2}>
                            <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
                                Mai attekintes
                            </Typography>
                            {mockFeed.map((item) => (
                                <Stack key={item.id} gap={0.75}>
                                    <Stack direction="row" justifyContent="space-between" gap={2}>
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>
                                            {item.meta}
                                        </Typography>
                                    </Stack>
                                    <Box
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 999,
                                            bgcolor: item.tone === "warning"
                                                ? "#f59e0b"
                                                : item.tone === "success"
                                                    ? "#10b981"
                                                    : "#38bdf8"
                                        }}
                                    />
                                    <Divider />
                                </Stack>
                            ))}
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 5 }}>
                        <Stack gap={1.5}>
                            <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
                                Tanulok meghivasa
                            </Typography>
                            <Typography sx={{ color: "text.secondary" }}>
                                Mock meghivasi blokk linkkel es osztalykoddal a tanari dashboardhoz.
                            </Typography>
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 4, borderColor: "rgba(148, 163, 184, 0.24)" }}>
                                <Stack gap={1.5}>
                                    <Stack direction="row" alignItems="center" gap={1}>
                                        <Link2 size={16} />
                                        <Typography sx={{ fontWeight: 700 }}>
                                            Meghivasi link
                                        </Typography>
                                    </Stack>
                                    <Typography sx={{ color: "text.secondary", wordBreak: "break-all" }}>
                                        lexo.app/class/invite/2B-ANGOL-2026
                                    </Typography>
                                    <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
                                        <Button variant="contained" color="button" startIcon={<Copy size={16} />} sx={{ borderRadius: 3 }}>
                                            Link masolasa
                                        </Button>
                                        <Button variant="outlined" startIcon={<MailPlus size={16} />} sx={{ borderRadius: 3 }}>
                                            Meghivo kuldese
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Paper>
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 4, borderColor: "rgba(148, 163, 184, 0.24)" }}>
                                <Stack gap={0.75}>
                                    <Typography sx={{ fontWeight: 700 }}>
                                        Osztalykod
                                    </Typography>
                                    <Typography sx={{ fontSize: 24, fontWeight: 800, letterSpacing: 1.2 }}>
                                        2B-ANGOL-2026
                                    </Typography>
                                    <Typography sx={{ color: "text.secondary" }}>
                                        A diakok ezzel a koddal is csatlakozhatnak az osztalyhoz.
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 5 }}>
                        <Stack gap={1.5}>
                            <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
                                Gyors teendok
                            </Typography>
                            <ActionRow title="Emlkezteto kuldese" description="Kuldd ki azoknak, akik meg nem kezdtek el az aktualis feladatot." />
                            <ActionRow title="Haladas ellenorzese" description="Nezd at, kik akadtak el az utolso ket feladatban." />
                            <ActionRow title="Uj feladat osszeallitasa" description="Keszits kovetkezo heti kiosztast a jelenlegi setekbol." />
                        </Stack>
                    </Paper>
                </Stack>
            </Stack>

            <Paper sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 5 }}>
                <Stack gap={2.5}>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        gap={2}
                    >
                        <Stack gap={0.5}>
                            <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                                Diakhaladas attekintes
                            </Typography>
                            <Typography sx={{ color: "text.secondary" }}>
                                Mock tanuloi lista tanari nezettel, hogy latszodjon a dashboard szerkezete.
                            </Typography>
                        </Stack>
                        <InviteForm classData={classData} type="student" />
                    </Stack>

                    <Stack gap={1.5}>
                        {classData.students.map((student) => (
                            <Paper
                                key={student.email}
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    borderRadius: 4,
                                    borderColor: "rgba(148, 163, 184, 0.24)"
                                }}
                            >
                                <Stack direction={{ xs: "column", md: "row" }} gap={2} alignItems={{ xs: "flex-start", md: "center" }}>
                                    <Stack direction="row" gap={1.5} alignItems="center" sx={{ minWidth: { md: 260 } }}>
                                        <Avatar sx={{ bgcolor: "#0f766e" }}>
                                            {student.name && student.name.slice(0, 1)}
                                        </Avatar>
                                        <Stack gap={0.25}>
                                            <Typography sx={{ fontWeight: 700 }}>
                                                {student.name}
                                            </Typography>
                                            <Typography sx={{ color: "text.secondary" }}>
                                                Aktiv - 1 nyitott feladat
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack gap={0.75} sx={{ flex: 1, width: "100%" }}>
                                        <Stack direction="row" justifyContent="space-between" gap={2}>
                                            <Typography sx={{ color: "text.secondary", fontWeight: 500 }}>
                                                Haladas
                                            </Typography>
                                            <Typography sx={{ fontWeight: 700 }}>
                                                40%
                                            </Typography>
                                        </Stack>
                                        <LinearProgress
                                            variant="determinate"
                                            value={40}
                                            sx={{
                                                height: 10,
                                                borderRadius: 999,
                                                bgcolor: "rgba(148, 163, 184, 0.18)",
                                                "& .MuiLinearProgress-bar": {
                                                    borderRadius: 999,
                                                    background: 40 >= 80
                                                        ? "linear-gradient(90deg, #16a34a 0%, #4ade80 100%)"
                                                        : 40 >= 60
                                                            ? "linear-gradient(90deg, #0891b2 0%, #38bdf8 100%)"
                                                            : "linear-gradient(90deg, #f59e0b 0%, #fb7185 100%)"
                                                }
                                            }}
                                        />
                                    </Stack>

                                    <Stack direction="row" gap={1} sx={{ flexWrap: "wrap" }}>
                                        <Chip label={`3 napos aktivitas`} sx={{ fontWeight: 600 }} />
                                        <Chip
                                            label="Aktiv"
                                            sx={{
                                                fontWeight: 700,

                                                color: "#166534"
                                                /*
                                                bgcolor: student.status === "Lemaradas"
                                                    ? "#fee2e2"
                                                    : student.status === "Figyelendo"
                                                        ? "#fef3c7"
                                                        : "#dcfce7",
                                                color: student.status === "Lemaradas"
                                                    ? "#b91c1c"
                                                    : student.status === "Figyelendo"
                                                        ? "#92400e"
                                                        : "#166534"
                                                        */
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
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

export default ClassDashboard
