"use client"

import useMenuControl from '@/lib/hooks/useMenuControl';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, SvgIconProps } from '@mui/material';
import { FC, Fragment, MouseEvent, ReactNode } from 'react';

interface props extends SvgIconProps {
    children: ReactNode
}

const RowSetCardMenu: FC<props> = ({ children, ...svgIconProps }) => {

    const menuControl = useMenuControl()

    const handleCLick = (e: MouseEvent<SVGSVGElement>) => {
        e.preventDefault()
        menuControl.handleOpen(e)
    }

    return (
        <Fragment>
            <MoreVertIcon
                onClick={handleCLick}
                {...svgIconProps}
                sx={{ alignSelf: "center", cursor: "pointer", ...svgIconProps.sx }}
            />
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