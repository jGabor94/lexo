"use client"

import useMenuControl from "@/hooks/useMenuControl"
import { IconButtonGrey } from "@/lib/mui/styled"
import { Menu, Tooltip } from "@mui/material"
import { EllipsisVertical } from "lucide-react"
import { FC, Fragment } from "react"
import DeleteSet from "./DeleteSet"
import EditSet from "./EditSet"
import ExportTerms from "./ExportTerms"
import MoveToFolder from "./MoveToFolder"

const SetMenu: FC<{}> = () => {

    const menuControl = useMenuControl()

    return (
        <Fragment>
            <Tooltip title="Menü">
                <IconButtonGrey onClick={menuControl.handleOpen}>
                    <EllipsisVertical />
                </IconButtonGrey>
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
                <ExportTerms {...{ menuControl }} />
                <DeleteSet />
            </Menu>
        </Fragment>

    )
}

export default SetMenu