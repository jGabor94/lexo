"use client"

import ModalOverlay from '@/components/ui/ModalOverlay'
import { MenuControl } from '@/hooks/useMenuControl'
import useModalControl from '@/hooks/useModalControl'
import { Button, DialogActions, Divider, ListItemIcon, ListItemText, MenuItem, Modal, Radio, Stack, Typography } from '@mui/material'
import { Download } from 'lucide-react'
import { FC, Fragment, useState } from 'react'
import useSet from '../hooks/useSet'

const ExportTerms: FC<{ menuControl: MenuControl }> = ({ menuControl }) => {



    const { set } = useSet()

    const { open, handleOpen, ...rest } = useModalControl()
    const [format, setFormat] = useState<"txt" | "csv">("txt");

    const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormat(event.target.value as "txt" | "csv");
    };

    const handleClose = () => {
        menuControl.handleClose()
        rest.handleClose()
        setFormat("txt")
    }

    const handleDownload = () => {

        let content = ''
        let mimeType = '';
        let fileExtension = '';

        if (format === 'csv') {
            content = set.terms.map(term => {
                const definitionText = term.definition.content.join(', ');
                return `${term.term.content}; ${definitionText}`;
            }).join('\n');
            mimeType = 'text/csv;charset=utf-8';
            fileExtension = '.csv';

        } else {
            content = set.terms.map(term => {
                const definitionText = term.definition.content.join(', ');
                return `${term.term.content}\t${definitionText}`;
            }).join('\n');
            mimeType = 'text/plain;charset=utf-8';
            fileExtension = '.txt';
        }



        const BOM = '\uFEFF';
        content = BOM + content;

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = set.name + fileExtension;
        a.click();

        URL.revokeObjectURL(url);
    }

    return (

        <Fragment>
            <MenuItem onClick={handleOpen}>
                <ListItemIcon>
                    <Download size={20} />
                </ListItemIcon>
                <ListItemText>Exportálás</ListItemText>
            </MenuItem>
            <Modal {...{ open }}>
                <ModalOverlay onClose={handleClose} sx={{ width: 600 }}>
                    <Stack gap={2}>
                        <Typography>Exportálás</Typography>
                        <Stack direction="row">
                            <Stack direction="row" alignItems="center" justifyContent="space-between" >
                                <Typography>txt</Typography>
                                <Radio
                                    checked={format === 'txt'}
                                    onChange={handleFormatChange}
                                    value="txt"
                                    name="radio-buttons"
                                />
                            </Stack>
                            <Divider flexItem orientation="vertical" />
                            <Stack direction="row" alignItems="center" justifyContent="space-between" ml={1} >
                                <Typography>csv</Typography>
                                <Radio
                                    checked={format === 'csv'}
                                    onChange={handleFormatChange}
                                    value="csv"
                                    name="radio-buttons"
                                />
                            </Stack>
                        </Stack>
                    </Stack>

                    <DialogActions>
                        <Button variant="text" onClick={handleClose}>Mégse</Button>
                        <Button variant="contained" onClick={handleDownload} >letöltés</Button>
                    </DialogActions>
                </ModalOverlay>
            </Modal>

        </Fragment >
    )
}

export default ExportTerms