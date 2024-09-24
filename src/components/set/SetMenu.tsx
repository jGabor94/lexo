"use client"

import useMenuControl from "@/lib/hooks/useMenuControl"
import useSet from "@/lib/hooks/useSet"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, Menu } from "@mui/material"
import { FC, Fragment } from "react"
import DeleteSet from "./DeleteSet"
import EditSet from "./EditSet"
import MoveToFolder from "./MoveToFolder"

const SetMenu: FC<{}> = () => {

    const { set } = useSet()
    const menuControl = useMenuControl()

    return (
        <Fragment>
            <Button
                id="menu-button"
                aria-controls={menuControl.open ? 'menu' : undefined}
                variant="outlined"
                size="small"
                onClick={menuControl.handleOpen}
            >
                <MoreVertIcon />
            </Button>
            <Menu
                id="menu"
                anchorEl={menuControl.anchorEl}
                open={menuControl.open}
                onClose={menuControl.handleClose}
                MenuListProps={{
                    'aria-labelledby': 'menu-button',
                }}
            >
                <MoveToFolder  {...{ set, menuControl }} />
                <EditSet {...{ set, menuControl }} />
                <DeleteSet {...{ set, menuControl }} />
            </Menu>
        </Fragment>

    )
}

export default SetMenu