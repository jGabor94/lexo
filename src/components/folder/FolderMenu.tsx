"use client"

import EditFolder from "@/components/folder/EditFolder"
import { Folder } from "@/lib/database/queries/getFolder"
import useMenuControl from "@/lib/hooks/useMenuControl"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, Menu } from "@mui/material"
import { FC, Fragment } from "react"
import DeleteFolder from "./DeleteFolder"

const FolderMenu: FC<{ folder: Folder }> = ({ folder }) => {

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
                <EditFolder {...{ folder, menuControl }} />
                <DeleteFolder {...{ folder }} />
            </Menu>
        </Fragment >
    )
}

export default FolderMenu