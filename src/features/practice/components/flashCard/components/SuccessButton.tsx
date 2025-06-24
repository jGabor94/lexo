import useFlashCard from "@/features/practice/hooks/useFlashCard";
import { IconButton, Tooltip } from "@mui/material";
import { animate } from "framer-motion";
import { CircleCheckBig, LucideProps } from "lucide-react";
import { FC } from 'react';
import useKeyFrames from "../../../hooks/useKeyFrames";


const SuccessButton: FC<LucideProps> = (props) => {

    const { handleSuccess } = useFlashCard()
    const { successClick: keyFrames } = useKeyFrames()

    const handleSuccessClick = () => {
        handleSuccess()
        animate("#successCard", keyFrames, {
            duration: 1,
            times: [0, 0.2, 0.5, 1],
        })
    };

    return (
        <Tooltip title="Tudom">
            <IconButton onClick={handleSuccessClick} >
                <CircleCheckBig {...props} size={40} style={{ zIndex: -10000, ...props.style }} />
            </IconButton>
        </Tooltip>

    )
}

export default SuccessButton