import { Box } from "@mui/material";
import { FC } from "react";

const Line: FC<{
    width: number | string;
    color1: string;
    color2: string;
}> = ({ width, color1, color2 }) => {
    const rgbValues1 = color1.match(/\d+/g);
    const rgbValues2 = color2.match(/\d+/g);

    if (rgbValues1?.length !== 3 || rgbValues2?.length !== 3) {
        throw new Error("Wrong RGB format!");
    }

    const [r1, g1, b1] = rgbValues1;
    const [r2, g2, b2] = rgbValues2;

    return (
        <Box sx={{ width, position: "relative" }}>
            <Box
                sx={{
                    height: "1px",
                    width: "100%",
                    background: `linear-gradient(90deg, rgba(${r2},${g2},${b2},0) 0%, rgba(${r2},${g2},${b2},0.5) 10%, rgba(${r1},${g1},${b1},1) 50%, rgba(${r2},${g2},${b2},0.5) 90%, rgba(${r2},${g2},${b2},0) 100%)`,
                }}
            />
            <Box
                sx={{
                    height: 5,
                    width: "100%",
                    position: "absolute",
                    margin: "auto",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    background: `linear-gradient(90deg, rgba(${r2},${g2},${b2},0) 0%, rgba(${r2},${g2},${b2},0.2) 30%, rgba(${r1},${g1},${b1},1) 50%, rgba(${r2},${g2},${b2},0.2) 70%, rgba(${r2},${g2},${b2},0) 100%)`,
                    filter: "blur(4px)",
                }}
            />
        </Box>
    );
};

export default Line;
