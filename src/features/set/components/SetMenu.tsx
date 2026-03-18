"use client"

import useMenuControl from "@/hooks/useMenuControl"
import { IconButtonGrey } from "@/lib/mui/styled"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Menu, Tooltip, useTheme } from "@mui/material"
import { FC, Fragment } from "react"
import DeleteSet from "./DeleteSet"
import EditSet from "./EditSet"
import ExportTerms from "./ExportTerms"
import MoveToFolder from "./MoveToFolder"

const SetMenu: FC<{}> = () => {

    const menuControl = useMenuControl()
    const theme = useTheme()

    return (
        <Fragment>
            <Tooltip title="Menü">
                <IconButtonGrey onClick={menuControl.handleOpen} >
                    <MoreVertIcon />
                </IconButtonGrey>
            </Tooltip>
            <Menu
                id="menu"
                anchorEl={menuControl.anchorEl}
                open={menuControl.open}
                onClose={menuControl.handleClose}
                disableScrollLock
            >

                <ExportTerms {...{ menuControl }} />
                <MoveToFolder  {...{ menuControl }} />
                <EditSet {...{ menuControl }} />
                <DeleteSet />

            </Menu>
        </Fragment>

    )
}

export default SetMenu