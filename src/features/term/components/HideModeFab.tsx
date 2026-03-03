import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from "@mui/icons-material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Box, BoxProps, Paper, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { HiddenMode } from "../types";

const HideModeFab: FC<{
    hiddenMode: HiddenMode;
    onHideModeChange: Dispatch<SetStateAction<HiddenMode>>
} & BoxProps> = ({ hiddenMode, onHideModeChange, ...boxProps }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [init, setInit] = useState(false)
    const [buttonVariant, setButtonVariant] = useState<"terms" | "definitions">("terms")

    const handleChange = (_: React.MouseEvent<HTMLElement>, newMode: HiddenMode | "") => {
        if (newMode !== "") {
            if (newMode === hiddenMode) {
                onHideModeChange(null);
            } else {
                onHideModeChange(newMode);
            }
        }

    };

    const handleButtonVariantChange = () => {
        setButtonVariant(buttonVariant === "terms" ? "definitions" : "terms")
        if (hiddenMode) {
            onHideModeChange(hiddenMode === "terms" ? "definitions" : "terms")
        }
    }

    useEffect(() => { setInit(true) }, [])


    return init && (

        <Box
            component={motion.div}
            key="HideModeFab"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            sx={{
                zIndex: 1000,
                position: "sticky",
                bottom: "calc(100lvh - 100dvh + 20px)",
                margin: "0 auto",
                ...boxProps.sx
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    borderRadius: 10,
                    overflow: 'hidden',
                }}
            >
                <ToggleButtonGroup
                    value={hiddenMode}
                    exclusive
                    onChange={handleChange}
                    aria-label="hide mode"
                    sx={{
                        bgcolor: 'background.paper',
                        '& .MuiToggleButton-root': {
                            border: 'none',
                            px: isMobile ? 2 : 2.5,
                            py: isMobile ? 1 : 1.5,
                            gap: 1.5,

                            '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                            },
                        },
                    }}
                >
                    {buttonVariant === "terms" ? (
                        <ToggleButton value="terms" aria-label="hide term">
                            {hiddenMode === "terms" ? (
                                <VisibilityOffIcon sx={{ fontSize: 25, color: "white" }} />
                            ) : (
                                <VisibilityIcon sx={{ fontSize: 25, color: "text.secondary" }} />
                            )}
                            <Typography variant="body1" fontWeight={500} color={hiddenMode ? "white" : "text.secondary"}>
                                Kifejezés
                            </Typography>
                        </ToggleButton>
                    ) : (
                        <ToggleButton value="definitions" aria-label="hide term">
                            {hiddenMode === "definitions" ? (
                                <VisibilityOffIcon sx={{ fontSize: 25, color: "white" }} />
                            ) : (
                                <VisibilityIcon sx={{ fontSize: 25, color: "text.secondary" }} />
                            )}
                            <Typography variant="body1" fontWeight={500} color={hiddenMode ? "white" : "text.secondary"} >
                                Jelentés
                            </Typography>
                        </ToggleButton>
                    )}

                    <ToggleButton value="" sx={{
                        bgcolor: "primary.main",
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                    }} selected={false} aria-label="hide definition" onClick={handleButtonVariantChange}>
                        <SwapHorizIcon sx={{ fontSize: 30, color: "white" }} />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Paper>
        </Box>

    )
}

export default HideModeFab