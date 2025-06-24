"use client"

import SidebarFooterAccount from '@/components/SidebarFooterAccount';
import { Logo } from '@/components/ui/logo';
import CreateSet from '@/features/set/components/CreateSet';
import { Box, Button, Stack } from '@mui/material';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { FC, ReactNode } from 'react';


const Layout: FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <DashboardLayout

            defaultSidebarCollapsed
            sx={{
                border: "none",
                borderBottom: "none",
                ".mui-1j66z2y-MuiPaper-root-MuiAppBar-root": {
                    border: "none",

                },
                "& .mui-6iuseh-MuiPaper-root-MuiAppBar-root": {
                    elevation: 0,
                    border: "none",
                    boxShadow: "none",
                    borderBottom: "none",

                },

                "& .MuiToolbar-root": {
                    "& .MuiStack-root": {
                        alignItems: 'center',
                        borderBottom: "none",

                    }
                },
                "& .MuiDrawer-root": {

                    "& .MuiPaper-root": {
                        elevation: 0,
                        border: "none",
                        boxShadow: "none",
                        "& .MuiBox-root": {
                            overflow: "hidden",
                            "& .MuiList-root": {
                                "& .MuiListItem-root": {
                                    "& .MuiButtonBase-root": {
                                        "& .MuiListItemText-root": {
                                            "& .MuiTypography-root": {
                                                fontWeight: 700,
                                            }

                                        }

                                    }


                                }

                            }

                        }
                    }

                }

            }}
            slots={{
                appTitle: () => <Stack alignItems="center"><Logo /></Stack>,
                toolbarActions: () => (
                    <Stack direction="row" gap={2} alignItems="center">
                        <CreateSet />
                        <Button color="button" variant="contained" sx={{ background: "linear-gradient(90deg, #3CC8AF 0%, #3CC8F4 100%)", border: "none", }}>
                            Plus csomag
                        </Button>
                    </Stack>

                ),
                sidebarFooter: SidebarFooterAccount,
                toolbarAccount: () => null
            }}

        >
            <Box sx={{
                width: 1100, maxWidth: "98%", margin: "0 auto", mt: 4, mb: 4,
            }}>
                {children}

            </Box>
        </DashboardLayout>
    );
}

export default Layout