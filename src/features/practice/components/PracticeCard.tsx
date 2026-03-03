"use client"

import {
    SvgIconComponent
} from '@mui/icons-material';
import { alpha, Box, Card, CardContent, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
const PracticeCard: FC<{ Icon: SvgIconComponent, name: string, color: string }> = ({ Icon, name, color }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <Card
            elevation={0}
            sx={{
                background: `linear-gradient(135deg, ${alpha(color, 0.5)} 0%, ${color} 100%)`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                border: "none",
                position: 'relative',

                '&:hover': {
                    boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                },
            }}
        >
            <CardContent sx={{ py: 3, justifyContent: "center", position: 'relative', zIndex: 1, }}>
                <Box
                    sx={{
                        width: isMobile ? 48 : 64,
                        height: isMobile ? 48 : 64,
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <Icon sx={{ fontSize: isMobile ? 24 : 32, color: 'white' }} />
                </Box>
                <Typography textAlign="center" fontSize={15} fontWeight={700} sx={{ mb: 0.5, color: 'white', width: "100%" }}>
                    {name}
                </Typography>

            </CardContent>
            {/* Dekorációs háttér */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                }}
            />
        </Card >
    )
}

export default PracticeCard