import {
    AutoAwesome,
} from "@mui/icons-material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import { Stack } from '@mui/material';
import { FC } from 'react';
import { Term } from '../../types';

const TermStatusLabel: FC<{ term: Term, color: string }> = ({ term, color }) => {

    const progressStatus = term.progress?.status || 0;

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                position: "relative",
                backgroundColor: color,
                p: 1.75,
                borderRadius: 40,
                width: 20,
                height: 20,
            }}
        >
            {progressStatus === 0 && (
                <AutoAwesome
                    sx={{
                        fontSize: 16,
                        color: "white",
                        position: "absolute",
                    }}
                />
            )}

            {(progressStatus > 0 && progressStatus < 5) && (
                <SchoolIcon
                    sx={{
                        fontSize: 16,
                        color: "white",
                        position: "absolute",
                    }}
                />
            )}

            {(term.progress && (term.progress.status === 5) && term.progress.updatedAt && ((new Date(term.progress.updatedAt).getTime() - Date.now()) > 1209600000)) && (
                <AccessTimeFilledIcon
                    sx={{
                        fontSize: 16,
                        color: "white",
                        position: "absolute",
                    }}
                />
            )}

            {((progressStatus === 5) && (
                <CheckCircleIcon
                    sx={{
                        fontSize: 16,
                        color: "white",
                        position: "absolute",
                    }}
                />
            ))}

        </Stack>
    )





}

export default TermStatusLabel