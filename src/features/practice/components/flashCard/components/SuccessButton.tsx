import useExerciseController from "@/features/practice/hooks/useExerciseController";
import { IconButton, Tooltip } from "@mui/material";
import { animate } from "framer-motion";
import { CircleCheckBig, LucideProps } from "lucide-react";
import { FC, useEffect } from 'react';
import useKeyFrames from "../../../hooks/useKeyFrames";


const SuccessButton: FC<LucideProps> = (props) => {

    const { handleSuccess } = useExerciseController()
    const { successClick: keyFrames } = useKeyFrames()

    const onSuccess = () => {
        handleSuccess()
        animate("#successCard", keyFrames, {
            duration: 1,
            times: [0, 0.2, 0.5, 1],
        })
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                onSuccess();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <Tooltip title="Tudom">
            <IconButton onClick={onSuccess} >
                <CircleCheckBig {...props} size={40} style={{ zIndex: -10000, ...props.style }} />
            </IconButton>
        </Tooltip>

    )
}

export default SuccessButton