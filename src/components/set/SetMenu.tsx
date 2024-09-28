"use client"

import useMenuControl from "@/lib/hooks/useMenuControl"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, Menu } from "@mui/material"
import { FC, Fragment } from "react"
import DeleteSet from "./DeleteSet"
import EditSet from "./EditSet"
import MoveToFolder from "./MoveToFolder"

const SetMenu: FC<{}> = () => {

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
                <MoveToFolder  {...{ menuControl }} />
                <EditSet {...{ menuControl }} />
                <DeleteSet />
            </Menu>
        </Fragment>

    )
}

export default SetMenu