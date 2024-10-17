"use client"

import { useTheme } from "@mui/material"

const useKeyFrames = () => {

    const { palette: { primary, warning, background } } = useTheme()

    return {
        successClick: {
            display: "flex",
            x: [0, 0, 0, "50%"],
            rotate: [0, 0, 0, "0.01turn"],
            opacity: [0, 1, 1, 0],
            backgroundColor: [primary.main, null, null, null],
            transitionEnd: { display: "none" }
        },
        undoClick: {
            display: "flex",
            x: [0, 0, 0, "-50%"],
            rotate: [0, 0, 0, "-0.01turn"],
            opacity: [0, 1, 1, 0],
            backgroundColor: [background.default, null, null, null],
            transitionEnd: { display: "none" }
        },
        wrongClick: {
            display: "flex",
            x: [0, 0, 0, "-50%"],
            rotate: [0, 0, 0, "-0.01turn"],
            opacity: [0, 1, 1, 0],
            backgroundColor: [warning.main, null, null, null],
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


