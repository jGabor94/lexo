import LinearLoading from '@/components/LinearLoading';
import ModalOverlay from '@/components/ui/ModalOverlay';
import { FolderListItem } from '@/features/folder/types';
import { MenuControl } from '@/hooks/useMenuControl';
import useModalControl from '@/hooks/useModalControl';
import useDal from '@/lib/dal/useDal';
import { Button, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { Folder, PackageMinus } from 'lucide-react';
import { FC, Fragment, useMemo, useState } from 'react';
import useSWR from 'swr';
import { addToFolder as addToFolderAction } from '../dal/mutations';
import useSet from '../hooks/useSet';



const MoveToFolder: FC<{ menuControl: MenuControl }> = ({ menuControl }) => {

    const [selectedFolderId, setSelectedFolderId] = useState<string>("");

    const { set } = useSet()

    const { data: folders, isLoading } = useSWR("/api/folder/own", async () => {
        const res = await fetch("/api/folder/own");

        if (!res.ok) {
            const text = await res.text();
            let errorMessage;
            try {
                const errorData = JSON.parse(text);
                errorMessage = errorData.message || `Hiba: ${res.status}`;
            } catch {
                errorMessage = text || `Hiba történt: ${res.status}`;
            }
            throw new Error(errorMessage);
        }

        const data: FolderListItem[] = await res.json();
        return data

    })

    const selectedFolder = useMemo(
        () => folders?.find(folder => folder.id === selectedFolderId),
        [selectedFolderId]
    );

    const modalControl = useModalControl()

    const { action: addToFolder, progress } = useDal(addToFolderAction, {
        alerts: {
            success: { severity: "success", content: "Szógyűjtemény sikeresen hozzáadva a mappához 🙂" },
        }
    })

    const closeModal = () => {
        modalControl.handleClose()
        menuControl.handleClose()
    };


    const handleChange = (e: SelectChangeEvent) => {
        setSelectedFolderId(e.target.value)
    };

    const handleAdd = async () => {
        const error = await addToFolder(selectedFolderId, set.id)
        if (!error) closeModal()
    }

    return (
        <Fragment>
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
                    <LinearLoading {...{ loading: progress || isLoading }} />
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
                                    {folders.filter(folder => !folder.sets.includes(set.id)).map((folder) => (
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
                            <Button variant='contained' onClick={handleAdd} disabled={progress}>Hozzáadás</Button>
                        </Stack>


                    )}

                </ModalOverlay>
            </Modal>
        </Fragment >
    )
}

export default MoveToFolder