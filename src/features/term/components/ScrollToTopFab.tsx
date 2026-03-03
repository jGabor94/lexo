import { KeyboardArrowUp as ArrowUpIcon } from "@mui/icons-material";
import { Box, BoxProps, IconButton, Paper, useMediaQuery, useTheme } from '@mui/material';
import { FC, useEffect, useState } from 'react';


const ScrollToTopFab: FC<BoxProps> = (props) => {

    const [showButton, setShowButton] = useState(false)

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClick = () => {
        const container = document.getElementById("dashboard_container")

        if (container) {
            const mainContainer = container.parentElement;

            if (mainContainer) {
                mainContainer.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }




    };



    useEffect(() => {
        const container = document.getElementById("dashboard_container")

        if (container) {
            const mainContainer = container.parentElement;

            if (mainContainer) {

                const handleVisibleButton = () => {
                    if (mainContainer.scrollTop > 300 && !showButton) {
                        setShowButton(true);
                    }

                    if (mainContainer.scrollTop < 300 && showButton) {
                        setShowButton(false);
                    }

                };

                mainContainer.addEventListener("scroll", handleVisibleButton);


            }
        }

    });

    return showButton && (
        <Box
            {...props}
            sx={{
                zIndex: 1000,
                ...props.sx
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    borderRadius: 10,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    '&:hover': {
                        bgcolor: 'grey.100',
                    },
                }}
                onClick={handleClick}
            >
                <IconButton
                    size="small"
                    sx={{
                        p: isMobile ? 1 : 1.5,
                        color: 'inherit',
                    }}
                >
                    <ArrowUpIcon sx={{
                        fontSize: 25, color: 'text.secondary',
                    }} />
                </IconButton>
            </Paper>
        </Box >
    )
}

export default ScrollToTopFab