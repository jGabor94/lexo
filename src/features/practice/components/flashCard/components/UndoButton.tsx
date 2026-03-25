import useExerciseController from '@/features/practice/hooks/useExerciseController';
import { Stack, Typography } from '@mui/material';
import { animate } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { FC, useEffect } from 'react';
import useKeyFrames from '../../../hooks/useKeyFrames';

const UndoButton: FC<{}> = () => {

    const { index, handleUndo } = useExerciseController()
    const { undoClick: keyFrames } = useKeyFrames()

    const onUndo = () => {
        if (index > 0) {
            handleUndo()
            animate("#undoCard", keyFrames, {
                duration: 1,
                times: [0, 0.2, 0.5, 1]
            })
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                onUndo();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onUndo]);

    return (
        <Stack direction="row" gap={0.5} onClick={onUndo} alignItems="center" sx={{ cursor: "pointer" }}>
            <RotateCcw size={25} />
            <Typography>Visszavonás</Typography>
        </Stack>
    )
}

export default UndoButton