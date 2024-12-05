import LinearLoading from '@/components/LinearLoading';
import ModalOverlay from '@/components/ui/ModalOverlay';
import SA_GetFolders from '@/features/folder/actions/getFolders';
import { FolderListItem } from '@/features/folder/types';
import SA_AddToFolder from '@/features/set/actions/addToFolder';
import { MenuControl } from '@/hooks/useMenuControl';
import useModalControl from '@/hooks/useModalControl';
import useAction from '@/lib/serverAction/useAction';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import FolderIcon from '@mui/icons-material/Folder';
import { Button, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import useSet from '../hooks/useSet';



const MoveToFolder: FC<{ menuControl: MenuControl }> = ({ menuControl }) => {

    const [folders, setFolders] = useState<FolderListItem[] | null>(null)
    const [selectedFolderId, setSelectedFolderId] = useState<string>("");
    const [loading, setLoading] = useState(false)

    const { set } = useSet()

    const selectedFolder = useMemo(
        () => folders?.find(folder => folder.id === selectedFolderId),
        [selectedFolderId]
    );

    const modalControl = useModalControl()

    const { action: addToFolder } = useAction(SA_AddToFolder, {
        200: { severity: "success", content: "Set successfully added to the folder 🙂" }
    })

    const closeModal = () => {
        modalControl.handleClose()
        menuControl.handleClose()
    };


    const handleChange = (e: SelectChangeEvent) => {
        setSelectedFolderId(e.target.value)
    };

    const handleAdd = async () => {
        setLoading(true)
        await addToFolder(selectedFolderId, set.id)
        closeModal()
        setLoading(false)
    }

    useEffect(() => {
        SA_GetFolders().then((res) => {
            if (res.statusCode === 200) {
                setFolders(res.payload.filter(folder => !folder.sets.includes(set.id)))
            }
        })
    }, [])


    return (
        <Fragment>
            <LinearLoading {...{ loading }} />
            <MenuItem onClick={() => modalControl.handleOpen()}>
                <ListItemIcon>
                    <DriveFileMoveIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Move to folder</ListItemText>
            </MenuItem>
            <Modal
                open={modalControl.open}
                onClose={closeModal}
            >
                <ModalOverlay width={400} onClose={closeModal} sx={{ pt: 6 }}>
                    {folders && (
                        <Stack gap={2}>
                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel id="multiple-folder-label">Folders</InputLabel>
                                <Select
                                    labelId="multiple-folder-label"
                                    id="multiple-folder"
                                    value={selectedFolderId}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-folder" label="Folders" />}
                                    renderValue={() => (
                                        <Stack direction="row" gap={1}>
                                            <FolderIcon fontSize="small" />
                                            <Typography>{selectedFolder?.name}</Typography>
                                        </Stack>
                                    )}
                                >
                                    {folders.map((folder) => (
                                        <MenuItem
                                            key={folder.id}
                                            value={folder.id}
                                        >
                                            <ListItemIcon>
                                                <FolderIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>
                                                {folder.name}
                                            </ListItemText>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant='contained' onClick={handleAdd}>Add</Button>
                        </Stack>


                    )}

                </ModalOverlay>
            </Modal>
        </Fragment >
    )
}

export default MoveToFolder