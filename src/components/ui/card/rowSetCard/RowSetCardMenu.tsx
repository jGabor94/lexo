"use client"

import useMenuControl from '@/lib/hooks/useMenuControl';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu } from '@mui/material';
import { FC, Fragment, MouseEvent, ReactNode } from 'react';

const RowSetCardMenu: FC<{ children: ReactNode }> = ({ children }) => {

    const menuControl = useMenuControl()

    const handleCLick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        menuControl.handleOpen(e)
    }

    return (
        <Fragment>
            <IconButton
                id="menu-button"
                aria-controls={menuControl.open ? 'menu' : undefined}
                sx={{ height: "fit-content", alignSelf: "center" }}
                onClick={handleCLick} >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="menu"
                anchorEl={menuControl.anchorEl}
                open={menuControl.open}
                onClose={menuControl.handleClose}
                MenuListProps={{
                    'aria-labelledby': 'menu-button',
                }}
            >
                {children}
            </Menu>
        </Fragment>
    )
}

export default RowSetCardMenu