import useFlashCard from '@/features/practice/hooks/useFlashCard';
import SettingsBackupRestoreOutlinedIcon from "@mui/icons-material/SettingsBackupRestoreOutlined";
import { Stack, Typography } from '@mui/material';
import { animate } from 'framer-motion';
import { FC } from 'react';
import useKeyFrames from '../../../hooks/useKeyFrames';

const UndoButton: FC<{}> = () => {

    const { index, handleUndo } = useFlashCard()
    const { undoClick: keyFrames } = useKeyFrames()

    const handleUndoClick = () => {
        if (index > 0) {
            handleUndo()
            animate("#undoCard", keyFrames, {
                duration: 1,
                times: [0, 0.2, 0.5, 1]
            })
        }
    };

    return (
        <Stack direction="row" gap={0.5} onClick={handleUndoClick} alignItems="center" sx={{ cursor: "pointer" }}>
            <SettingsBackupRestoreOutlinedIcon sx={{ width: 30, height: 30 }} />
            <Typography>Undo</Typography>
        </Stack>
    )
}

export default UndoButton