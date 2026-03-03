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
            {term.status === 0 && (
                <AutoAwesome
                    sx={{
                        fontSize: 16,
                        color: "white",
                        position: "absolute",
                    }}
                />
            )}

            {(term.status > 0 && term.status < 5) && (
                <SchoolIcon
                    sx={{
                        fontSize: 16,
                        color: "white",
                        position: "absolute",
                    }}
                />
            )}

            {((term.status === 5) && term.lastReviewedAt && ((new Date(term.lastReviewedAt).getTime() - Date.now()) > 1209600000)) && (
                <AccessTimeFilledIcon
                    sx={{
                        fontSize: 16,
                        color: "white",
                        position: "absolute",
                    }}
                />
            )}

            {((term.status === 5) && (
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