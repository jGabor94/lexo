import useFlashCard from "@/lib/hooks/useFlashCard";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { IconButton, SvgIconProps, Tooltip } from "@mui/material";
import { animate } from "framer-motion";
import { FC } from 'react';
import useKeyFrames from "../flashcard/useKeyFrames";


const SuccessButton: FC<SvgIconProps> = (props) => {

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
        <Tooltip title="Know">
            <IconButton onClick={handleSuccessClick} >
                <CheckCircleOutlineOutlinedIcon {...props} sx={{ width: 40, height: 40, zIndex: -10000, ...props.sx }} />
            </IconButton>
        </Tooltip>

    )
}

export default SuccessButton