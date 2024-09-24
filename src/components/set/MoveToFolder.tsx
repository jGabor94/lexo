import SA_GetFolders from '@/lib/actions/folder/getFolders';
import SA_AddToFolder from '@/lib/actions/set/addToFolder';
import useAction from '@/lib/assets/serverAction/useAction';
import { FolderListItem } from '@/lib/database/queries/getFolders';
import { Set } from '@/lib/database/queries/getSet';
import { MenuControl } from '@/lib/hooks/useMenuControl';
import useModalControl from '@/lib/hooks/useModalControl';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import FolderIcon from '@mui/icons-material/Folder';
import { Box, Button, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Modal, OutlinedInput, Paper, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';


const MoveToFolder: FC<{ set: Set, menuControl: MenuControl }> = ({ set, menuControl }) => {

    const [folders, setFolders] = useState<FolderListItem[] | null>(null)
    const [selectedFolderId, setSelectedFolderId] = useState<string>("");

    const selectedFolder = useMemo(
        () => folders?.find(folder => folder._id === selectedFolderId),
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

        await addToFolder(selectedFolderId, set._id)
        closeModal()
    }

    useEffect(() => {
        SA_GetFolders().then((res) => {
            console.log({ res })
            if (res.statusCode === 200) {
                setFolders(res.payload.filter(folder => !folder.sets.includes(set._id)))
            }
        })
    }, [])


    return (
        <Fragment>
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
                <Box component={Paper} sx={{
                    boxShadow: 10,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    maxWidth: "95%",
                    outline: "none",
                    p: 3
                }}>
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
                                            key={folder._id}
                                            value={folder._id}
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

                </Box>
            </Modal>
        </Fragment >
    )
}

export default MoveToFolder