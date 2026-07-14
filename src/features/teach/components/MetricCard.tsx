import { Paper, Typography } from "@mui/material";
import { FC } from "react";

const MetricCard: FC<{ value: string, label: string }> = ({ value, label }) => (
    <Paper
        sx={{
            flex: 1,
            borderRadius: 4,
            p: 2.25,
            backdropFilter: "blur(12px)"
        }}
    >
        <Typography sx={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{value}</Typography>
        <Typography sx={{ mt: 0.75, color: "text.secondary", fontWeight: 500 }}>{label}</Typography>
    </Paper>
)

export default MetricCard