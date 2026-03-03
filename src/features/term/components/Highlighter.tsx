import { Box } from '@mui/material';
import { FC } from 'react';

const Highlighter: FC<{ text: string, stemsInput: string }> = ({ text, stemsInput }) => {

    const stems = stemsInput
        .split(/[\s,/|;]+/)
        .map(s => s.trim())
        .filter(Boolean);

    if (!stems.length) return text;

    const escaped = stems.map(s =>
        s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    const regex = new RegExp(
        `\\b((?:${escaped.join("|")})[\\p{L}]*)`,
        "giu"
    );

    return text.split(regex).map((part, index) =>
        regex.test(part) ? (
            <Box
                key={index}
                component="span"
                sx={{ fontWeight: 600, color: "primary.main" }}
            >
                {part}
            </Box>
        ) : (
            part
        )
    );
}

export default Highlighter