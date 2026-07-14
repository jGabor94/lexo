import { Avatar, AvatarGroup, Button, Chip, LinearProgress, Paper, Stack, Typography } from "@mui/material"
import { ArrowRight, BookOpen, CalendarClock, GraduationCap } from "lucide-react"
import Link from "next/link"
import { FC } from "react"
import { StudentOverview } from "../../types"

const StudentClassCard: FC<{ classData: StudentOverview["classes"][number] }> = ({ classData }) => {

    return (
        <Paper
            sx={{
                minHeight: 320,
                p: 3,
                borderWidth: 0,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 20px 45px rgba(15, 23, 42, 0.05)"
            }}
        >
            <Stack justifyContent="space-between" sx={{ height: "100%" }}>
                <Stack gap={2} mb={4}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
                        <Stack gap={1}>
                            <Chip
                                label={classData.tasks.length > 0 ? "aktiv" : "nincs feladat"}
                                size="small"
                                sx={{
                                    width: "fit-content",
                                    fontWeight: 700,
                                    bgcolor: classData.tasks.length > 0 ? "#dcfce7" : "#e2e8f0",
                                    color: classData.tasks.length > 0 ? "#166534" : "#475569",
                                }}
                            />
                            <Typography sx={{ fontSize: 24, fontWeight: 700, lineHeight: 1.15 }}>
                                {classData.name}
                            </Typography>
                        </Stack>
                        <GraduationCap size={24} color="#0f766e" />
                    </Stack>

                    <Typography sx={{ color: "text.secondary", minHeight: 48 }}>
                        {classData.description || "Ehhez az osztalyhoz meg nem tartozik leiras."}
                    </Typography>

                    <Stack direction="row" gap={1.25} sx={{ flexWrap: "wrap" }}>
                        <Chip
                            sx={{ fontWeight: 500 }}
                            label={`${classData.tasks.length} feladat`}
                            icon={<BookOpen size={18} />}
                        />
                        <Chip
                            sx={{ fontWeight: 500 }}
                            label={`${classData.teachers.length} tanar`}
                            icon={<GraduationCap size={18} />}
                        />
                    </Stack>

                    <Paper
                        sx={{
                            borderRadius: 4,
                            p: 2,
                            bgcolor: "background.default"
                        }}
                    >
                        <Stack gap={1.2}>
                            <Stack direction="row" justifyContent="space-between" gap={2}>
                                <Typography sx={{ fontSize: 14, color: "text.secondary", fontWeight: 600 }}>
                                    Kovetkezo teendo
                                </Typography>
                                {classData.nextAssignment && (
                                    <Stack direction="row" alignItems="center" gap={0.75}>
                                        <CalendarClock size={14} />
                                        <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                                            {new Intl.DateTimeFormat("hu-HU", { month: "long", day: "numeric" }).format(new Date(classData.nextAssignment.deadline))}
                                        </Typography>
                                    </Stack>
                                )}
                            </Stack>

                            <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                                {classData.nextAssignment ? classData.nextAssignment.name : "Jelenleg nincs kiosztott feladat"}
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>

                <Stack gap={2.5}>
                    <Stack gap={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography sx={{ fontSize: 14, color: "text.secondary", fontWeight: 600 }}>
                                Feladatlista allapota
                            </Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 800 }}>
                                {classData.progress}%
                            </Typography>
                        </Stack>
                        <LinearProgress
                            variant="determinate"
                            value={classData.progress}
                            sx={{
                                height: 10,
                                borderRadius: 999,
                                bgcolor: "rgba(148, 163, 184, 0.18)",
                                "& .MuiLinearProgress-bar": {
                                    borderRadius: 999,
                                    background: "linear-gradient(90deg, #64748b 0%, #38bdf8 100%)"
                                }
                            }}
                        />
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
                        <AvatarGroup spacing="small">
                            {classData.teachers.slice(0, 3).map((teacher, index) => (
                                <Avatar
                                    key={`${teacher.name}-${index}`}
                                    alt={teacher.name || "Tanar"}
                                    src={teacher.image || undefined}
                                >
                                    {teacher.name?.slice(0, 1) || "T"}
                                </Avatar>
                            ))}
                        </AvatarGroup>
                        <Link href={`/student/class/${classData.id}`} style={{ textDecoration: "none" }}>
                            <Button
                                variant="contained"
                                color="button"
                                endIcon={<ArrowRight size={16} />}
                                sx={{ borderRadius: 3 }}
                            >
                                Megnyitas
                            </Button>
                        </Link>

                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default StudentClassCard