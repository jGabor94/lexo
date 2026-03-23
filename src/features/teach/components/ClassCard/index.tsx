import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import { AvatarGroup, Button, Chip, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { ArrowRight, CalendarClock, MoreHorizontal } from "lucide-react";
import { FC } from "react";
import { ClassListItem } from "../../types";

const ClassCard: FC<{ item: ClassListItem }> = ({ item }) => {

    const accent = "#64748b"
    const accentSoft = "#e2e8f0"
    const status = "active"
    const students = 17
    const activeAssignments = 2
    const nextDeadline = "Március 28."
    const startedStudents = 8
    const completionRate = 72


    const statusLabelSx = {
        active: {
            bgcolor: "#dcfce7",
            color: "#166534",
        },
        /*
        "Figyelmet ker": {
            bgcolor: "#fef3c7",
            color: "#92400e",
        },
        Archivalt: {
            bgcolor: "#e2e8f0",
            color: "#475569",
        }*/
    } as const

    return (
        <Paper
            sx={{
                minHeight: 320,
                p: 3,
                //borderRadius: 6,
                borderWidth: 0,
                position: "relative",
                overflow: "hidden",
                // background: `linear-gradient(180deg, ${accentSoft} 0%, rgba(255,255,255,0.98) 26%)`,
                boxShadow: "0 20px 45px rgba(15, 23, 42, 0.05)"
            }}
        >


            <Stack justifyContent="space-between" sx={{ height: "100%" }}>
                <Stack gap={2} mb={4}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
                        <Stack gap={1}>
                            <Chip
                                label={status}
                                size="small"
                                sx={{
                                    width: "fit-content",
                                    fontWeight: 700,
                                    ...statusLabelSx[status]
                                }}
                            />
                            <Typography sx={{ fontSize: 24, fontWeight: 700, lineHeight: 1.15 }}>
                                {item.name}
                            </Typography>
                        </Stack>

                        <Button variant="text" sx={{ minWidth: 0, p: 0.5 }}>
                            <MoreHorizontal size={18} />
                        </Button>
                    </Stack>

                    <Typography sx={{ color: "text.secondary", maxHeight: 48 }}>
                        {item.description}
                    </Typography>

                    <Stack direction="row" gap={1.25} sx={{ flexWrap: "wrap" }}>
                        <Chip
                            sx={{ fontWeight: 500, }}
                            label={`${students} diák`}
                            icon={<PeopleIcon sx={{ width: 20 }} color="inherit" />}
                        />
                        <Chip
                            sx={{ fontWeight: 500, }}
                            label={`${item.teachers.length} tanár`}
                            icon={<SchoolIcon sx={{ width: 20 }} color="inherit" />}
                        />
                        <Chip
                            sx={{ fontWeight: 500, }}
                            label={`${activeAssignments} aktív feladat`}
                            icon={<AssignmentIcon sx={{ width: 20 }} color="inherit" />}
                        />

                    </Stack>

                    <Paper
                        sx={{
                            borderRadius: 4,
                            p: 2,
                            bgcolor: (t) => t.vars.palette.background.default
                        }}
                    >
                        <Stack gap={1.2}>
                            <Stack direction="row" justifyContent="space-between" gap={2}>
                                <Typography sx={{ fontSize: 14, color: "text.secondary", fontWeight: 600 }}>
                                    Következő teendő
                                </Typography>
                                <Stack direction="row" alignItems="center" gap={0.75}>
                                    <CalendarClock size={14} />
                                    <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                                        {nextDeadline}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                                {activeAssignments > 0
                                    ? `${startedStudents}/${students} diák már elkezdte`
                                    : "Jelenleg nincs aktív kiosztás"}
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>

                <Stack gap={2.5}>
                    <Stack gap={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography sx={{ fontSize: 14, color: "text.secondary", fontWeight: 600 }}>
                                Átlagos haladás
                            </Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 800 }}>
                                {completionRate}%
                            </Typography>
                        </Stack>
                        <LinearProgress
                            variant="determinate"
                            value={completionRate}
                            sx={{
                                height: 10,
                                borderRadius: 999,
                                bgcolor: "rgba(148, 163, 184, 0.18)",
                                "& .MuiLinearProgress-bar": {
                                    borderRadius: 999,
                                    background: `linear-gradient(90deg, ${accent} 0%, #38bdf8 100%)`
                                }
                            }}
                        />
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
                        <AvatarGroup />
                        <Button variant="contained" color="button" endIcon={<ArrowRight size={16} />} sx={{ borderRadius: 3 }}>
                            Megnyitás
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default ClassCard