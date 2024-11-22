import useFlashCard from '@/features/flashcard/hooks/useFlashCard';
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { IconButton, SvgIconProps, Tooltip } from '@mui/material';
import { animate } from 'framer-motion';
import { FC } from 'react';
import useKeyFrames from '../../hooks/useKeyFrames';

const WrongButton: FC<SvgIconProps> = (props) => {

    const { handleWrong } = useFlashCard()
    const { wrongClick: keyFrames } = useKeyFrames()

    const handleWrongClick = () => {
        handleWrong()
        animate("#wrongCard", keyFrames, {
            duration: 1,
            times: [0, 0.2, 0.5, 1],

        })
    };

    return (
        <Tooltip title="Still learning">
            <IconButton onClick={handleWrongClick}>
                <CancelOutlinedIcon {...props} sx={{ width: 40, height: 40, zIndex: -10000, ...props.sx }} />
            </IconButton>
        </Tooltip>

    )
}

export default WrongButton