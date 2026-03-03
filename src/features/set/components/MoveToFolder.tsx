import LinearLoading from '@/components/LinearLoading';
import ModalOverlay from '@/components/ui/ModalOverlay';
import { getOwnFolders } from '@/features/folder/dal/queries';
import { FolderListItem } from '@/features/folder/types';
import { MenuControl } from '@/hooks/useMenuControl';
import useModalControl from '@/hooks/useModalControl';
import useDal from '@/lib/dal/useDal';
import { Button, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { Folder, PackageMinus } from 'lucide-react';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { addToFolder as addToFolderAction } from '../dal/mutations';
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

    const { action: addToFolder } = useDal(addToFolderAction, {
        "success": { severity: "success", content: "Szógyűjtemény sikeresen hozzáadva a mappához 🙂" },
        fallbackError: (e) => ({ severity: "error", content: e.error.type })
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
        getOwnFolders().then((res) => {
            if (res.success) {
                setFolders(res.data.filter(folder => !folder.sets.includes(set.id)))
            }
        })
    }, [])


    return (
        <Fragment>
            <LinearLoading {...{ loading }} />
            <MenuItem onClick={() => modalControl.handleOpen()}>
                <ListItemIcon>
                    <PackageMinus size={20} />
                </ListItemIcon>
                <ListItemText>Áthelyezés mappába</ListItemText>
            </MenuItem>
            <Modal
                open={modalControl.open}
                onClose={closeModal}
            >
                <ModalOverlay width={400} onClose={closeModal} sx={{ pt: 6 }}>
                    {folders && (
                        <Stack gap={2}>
                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel id="multiple-folder-label">Mappák</InputLabel>
                                <Select
                                    labelId="multiple-folder-label"
                                    id="multiple-folder"
                                    value={selectedFolderId}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-folder" label="Folders" />}
                                    renderValue={() => (
                                        <Stack direction="row" gap={1}>
                                            <Folder size={20} />
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
                                                <Folder size={20} />
                                            </ListItemIcon>
                                            <ListItemText>
                                                {folder.name}
                                            </ListItemText>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant='contained' onClick={handleAdd}>Hozzáadás</Button>
                        </Stack>


                    )}

                </ModalOverlay>
            </Modal>
        </Fragment >
    )
}

export default MoveToFolder