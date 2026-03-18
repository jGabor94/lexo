"use client"

import ModalOverlay from '@/components/ui/ModalOverlay';
import useModalControl from '@/hooks/useModalControl';
import { SvgIconComponent } from '@mui/icons-material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SchoolIcon from '@mui/icons-material/School';
import { alpha, Box, Card, CardContent, Divider, Modal, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC, Fragment } from 'react';

const PracticeCard: FC<{
    Icon: SvgIconComponent,
    name: string,
    color: string,
    link: string
}> = ({ Icon, name, color, link }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { open, handleOpen, handleClose } = useModalControl()
    const router = useRouter()

    return (
        <Fragment>
            <Card
                elevation={0}
                onClick={handleOpen}
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

            <Modal {...{ open }}>
                <ModalOverlay onClose={handleClose} sx={{ width: 600, p: 4 }}>
                    <Stack alignItems="center">

                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2,
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                                backgroundColor: color
                            }}
                        >
                            <Icon sx={{ fontSize: 32, color: 'white' }} />
                        </Box>
                        <Stack gap={2} alignItems="center" >
                            <Typography variant="h5" fontWeight={700}>{name}</Typography>
                            <Typography color="textSecondary">Válassz tanulási típust</Typography>
                            <Card
                                elevation={0}
                                onClick={() => router.push(`${link}/free`)}
                                sx={{
                                    background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.5)} 100%)`,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    overflow: 'hidden',
                                    border: "none",
                                    position: 'relative',
                                    width: "100%",
                                    '&:hover': {
                                        boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 3, justifyContent: "center" }}>
                                    <Stack direction="row" gap={3} alignItems="center">
                                        <FitnessCenterIcon sx={{ color: "white", fontSize: 44 }} />
                                        <Stack gap={1}>
                                            <Typography variant='h6' fontWeight={600} sx={{ color: "white" }}>
                                                Gyakorlás
                                            </Typography>
                                            <Divider flexItem sx={{ color: "white" }} />
                                            <Typography sx={{ color: "white", fontSize: 13 }}>
                                                Összes kifejezés elérhető, és nem számít bele a haladásba.
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </CardContent>

                            </Card>
                            <Card
                                elevation={0}
                                onClick={() => router.push(`${link}/progress`)}
                                sx={{
                                    background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.5)} 100%)`,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    overflow: 'hidden',
                                    border: "none",
                                    position: 'relative',
                                    width: "100%",
                                    '&:hover': {
                                        boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 3, justifyContent: "center" }}>
                                    <Stack direction="row" gap={3} alignItems="center">
                                        <SchoolIcon sx={{ color: "white", fontSize: 44 }} />
                                        <Stack gap={1}>
                                            <Typography variant='h6' fontWeight={600} sx={{ color: "white" }}>
                                                Vizsga
                                            </Typography>
                                            <Divider flexItem sx={{ color: "white" }} />
                                            <Typography sx={{ color: "white", fontSize: 13 }}>
                                                Csak a gyakorlásra váró kifejezések elérhetők és az eredmény beleszámít a haladásba.
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </CardContent>

                            </Card>
                        </Stack>

                    </Stack>
                </ModalOverlay>
            </Modal>
        </Fragment >

    )
}

export default PracticeCard