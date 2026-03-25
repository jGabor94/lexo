"use client"

import { useMediaQuery, useTheme } from "@mui/material";

const useKeyFrames = () => {

    const { palette: { primary, warning }, vars } = useTheme()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const scale = isMobile ? [1, 1, 1, 1] : [1, 1.1, 1.1, 1.1]

    return {
        successClick: {
            display: "flex",
            x: [0, 0, 0, "50%"],
            scale,
            rotate: [0, 0, 0, "0.01turn"],
            opacity: [1, 1, 1, 0],
            backgroundColor: [primary.main, primary.main, primary.main, null],
            transitionEnd: { display: "none" }
        },
        undoClick: {
            display: "flex",
            x: [0, 0, 0, "-50%"],
            scale,
            rotate: [0, 0, 0, "-0.01turn"],
            opacity: [1, 1, 1, 0],
            backgroundColor: [vars.palette.background.default, vars.palette.background.default, vars.palette.background.default, null],
            transitionEnd: { display: "none" }
        },
        wrongClick: {
            display: "flex",
            x: [0, 0, 0, "-50%"],
            scale,
            rotate: [0, 0, 0, "-0.01turn"],
            opacity: [1, 1, 1, 0],
            backgroundColor: [warning.main, warning.main, warning.main, null],
            transitionEnd: { display: "none" }
        },
        successSlide: (x: number) => ({
            display: "flex",
            x: [x, x + 200],
            rotate: [x / 20, (x + 200) / 20],
            opacity: [1, 0],
            backgroundColor: [primary.main, null],
            transitionEnd: { display: "none" }
        }),
        wrongSlide: (x: number) => ({
            display: "flex",
            x: [x, x - 200],
            rotate: [x / 20, (x - 200) / 20],
            opacity: [1, 0],
            backgroundColor: [warning.main, null],
            transitionEnd: { display: "none" }
        })
    }

}

export default useKeyFrames


