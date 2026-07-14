import ConfirmDialog from '@/components/ConfirmDialog';
import useConfirmControll from '@/hooks/useConfirmControll';
import useDal from '@/lib/dal/useDal';
import { Delete, Edit, MoreVert } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { Dispatch, FC, Fragment, SetStateAction, useState } from 'react';
import { deleteTerm as deleteTermAction } from '../../dal/mutations';
import { Term } from '../../types';

const TermCardMenu: FC<{
    term: Term,
    setMode: Dispatch<SetStateAction<"read" | "edit">>,
}> = ({ term: { id: termid }, setMode }) => {


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(
        null,
    );

    const handleMenuOpen = (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setMode("edit")
        handleMenuClose()
    }

    const { action: deleteTerm, progress } = useDal(deleteTermAction, {
        alerts: {
            success: { severity: "success", content: "Kifejezés sikeresen törölve 🙂" }
        }
    })

    const { controll, trigger: triggerDelete } = useConfirmControll(async () => {

        const error = await deleteTerm(termid)
        if (!error) setMode("read")



    })

    return (
        <Fragment>
            <ConfirmDialog {...{ controll, dialogText: `Biztosan törölni szretnéd a kifejezés?` }} />

            <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{
                    color: "#94a3b8",
                    "&:hover": { background: "#f1f5f9" },
                }}
            >
                <MoreVert fontSize="small" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    },
                }}
            >
                <MenuItem onClick={handleEdit} disabled={progress}
                >
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Szerkesztés</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={triggerDelete}
                    disabled={progress}
                >
                    <ListItemIcon>
                        <Delete fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText >
                        Törlés
                    </ListItemText>
                </MenuItem>
            </Menu>
        </Fragment>

    )
}

export default TermCardMenu