"use client"

import useMenuControl from "@/hooks/useMenuControl"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, Menu, Tooltip } from "@mui/material"
import { FC, Fragment } from "react"
import DeleteSet from "./DeleteSet"
import EditSet from "./EditSet"
import MoveToFolder from "./MoveToFolder"

const SetMenu: FC<{}> = () => {

    const menuControl = useMenuControl()

    return (
        <Fragment>
            <Tooltip title="Menu">
                <IconButton onClick={menuControl.handleOpen}>
                    <MoreVertIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="menu"
                anchorEl={menuControl.anchorEl}
                open={menuControl.open}
                onClose={menuControl.handleClose}
                disableScrollLock
            >
                <MoveToFolder  {...{ menuControl }} />
                <EditSet {...{ menuControl }} />
                <DeleteSet />
            </Menu>
        </Fragment>

    )
}

export default SetMenu