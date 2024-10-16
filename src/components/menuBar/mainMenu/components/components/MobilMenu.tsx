import { Logo } from '@/components/ui/logo';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, SvgIconTypeMap, SwipeableDrawer } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import Link from 'next/link';
import { FC, useState } from 'react';

interface props {
    menuItems: Array<{
        label: string, path: string, icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
            muiName: string;
        }
    }>
}

const MobilMenu: FC<props> = ({ menuItems }) => {

    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(state => !state)

    return (
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                anchor={"left"}
                open={open}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
            >
                <Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} p={1} pr={2} pl={2}>
                        <Logo />
                        <MenuIcon onClick={toggleDrawer} />

                    </Stack>
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer}
                        onKeyDown={toggleDrawer}
                    >
                        <List>
                            {menuItems.map((item, index) => (
                                <ListItem key={item.label} disablePadding >
                                    <ListItemButton LinkComponent={Link} href={item.path}>
                                        <ListItemIcon sx={{ minWidth: 40 }}>
                                            <item.icon />
                                        </ListItemIcon>
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Stack>

            </SwipeableDrawer>
        </Box>
    )
}

export default MobilMenu