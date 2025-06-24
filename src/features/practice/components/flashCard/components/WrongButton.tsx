import useFlashCard from '@/features/practice/hooks/useFlashCard';
import { IconButton, Tooltip } from '@mui/material';
import { animate } from 'framer-motion';
import { CircleX, LucideProps } from 'lucide-react';
import { FC } from 'react';
import useKeyFrames from '../../../hooks/useKeyFrames';

const WrongButton: FC<LucideProps> = (props) => {

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
        <Tooltip title="Nem tudom">
            <IconButton onClick={handleWrongClick}>
                <CircleX {...props} size={40} style={{ zIndex: -10000, ...props.style }} />
            </IconButton>
        </Tooltip>

    )
}

export default WrongButton