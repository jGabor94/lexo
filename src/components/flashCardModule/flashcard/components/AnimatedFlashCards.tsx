"use client"

import { Stack, StackOwnProps, Typography } from "@mui/material";
import { FC, Fragment, ReactNode } from "react";

interface props extends StackOwnProps {
    children: ReactNode,
    id: string
}

const AnimatedFlashCard: FC<props> = ({ children, id }) => (

    <Stack
        alignItems="center"
        justifyContent="center"
        id={id}

        sx={{
            position: "absolute",
            borderRadius: "10px",
            width: "100%",
            height: "100%",
            opacity: 0,
            borderWidth: 2
        }}
    >
        <Typography fontSize={30} fontWeight={500}>{children}</Typography>
    </Stack >
)


const AnimatedFlashCards: FC<{}> = () => {
    return (
        <Fragment>
            <AnimatedFlashCard id="successCard">
                Know
            </AnimatedFlashCard>
            <AnimatedFlashCard id="wrongCard">
                Still Learning
            </AnimatedFlashCard>
            <AnimatedFlashCard id="undoCard">
                Undo
            </AnimatedFlashCard>
        </Fragment>
    );
};

export default AnimatedFlashCards;