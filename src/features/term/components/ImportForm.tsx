"use client"

import { Inputs } from '@/app/(main)/sets/[setid]/terms/create/page';
import ModalOverlay from '@/components/ui/ModalOverlay';
import useSet from '@/features/set/hooks/useSet';
import useModalControl from '@/hooks/useModalControl';
import { IconButtonGrey } from '@/lib/mui/styled';
import { Button, Divider, Modal, Paper, Radio, Stack, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ImportIcon, Info } from 'lucide-react';
import { FC, Fragment, KeyboardEventHandler, useEffect, useState } from 'react';
import { UseFieldArrayAppend } from 'react-hook-form';
import { TermInput } from '../types';

const ImportForm: FC<{ append: UseFieldArrayAppend<Inputs, "terms"> }> = ({ append }) => {

    const [customSeparator, setCustomSeparator] = useState<string>("");
    const [separator, setSeparator] = useState<"ws" | "tab">("tab");
    const [terms, setTerms] = useState<TermInput[]>([]);
    const [importedText, setImportedText] = useState<string>("");

    const { set } = useSet()
    const modalControl = useModalControl()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSeparatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as "ws" | "tab";
        setSeparator(value);
    };

    const createTerms = () => {

        if (importedText) {
            const selectedSeparator = customSeparator || (separator === 'tab' ? '\t' : ' ');


            setTerms(importedText.split('\n').map((line) => {

                const [term, ...def] = line.split(selectedSeparator);

                const definition = def.join(selectedSeparator);

                return {
                    term: {
                        content: term,
                        lang: set.preferredTermLang
                    },
                    definition: {
                        content: [...definition?.split(',') || []],
                        lang: set.preferredDefinitionLang
                    }
                }
            }))


        }
    }

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();

            const target = e.target as HTMLTextAreaElement;
            const start = target.selectionStart;
            const end = target.selectionEnd;

            const newValue = importedText.substring(0, start) + '\t' + importedText.substring(end);
            setImportedText(newValue);

            requestAnimationFrame(() => {
                target.selectionStart = target.selectionEnd = start + 1;
            });
        }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setImportedText(e.target.value);
    }

    const reset = () => {
        setCustomSeparator("");
        setSeparator("tab");
        setImportedText("");
        setTerms([]);
    }

    const handleSave = () => {
        append(terms);
        reset()
        closeModal()
    }


    useEffect(() => {
        createTerms()
    }, [separator, customSeparator, importedText]);


    const closeModal = () => {
        modalControl.handleClose()
        reset()
    };

    return (
        <Fragment>
            <Tooltip title="Importálás">
                <IconButtonGrey onClick={modalControl.handleOpen}>
                    <ImportIcon />
                </IconButtonGrey>
            </Tooltip>
            <Modal
                open={modalControl.open}
                onClose={closeModal}
                keepMounted={true}
            >
                <ModalOverlay width={1000} onClose={closeModal} sx={{ height: "90vh", overflowY: "scroll", pt: 8 }}>
                    <Stack gap={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
                            <Typography>Illeszd be a szövegmezőbe a nyers importálandó adatot</Typography>
                            <Button sx={{ height: "fit-content" }} color="button" onClick={handleSave}>Importálás</Button>

                        </Stack>
                        <TextField rows={10} multiline onChange={handleTextChange} value={importedText} onKeyDown={handleKeyDown} />
                        <Stack>
                            <Stack direction="row" gap={2}>
                                <Typography fontWeight={700}>Elválasztás</Typography>
                                <Tooltip title="Add meg, hogy az importált szövegben milyen karakter választja el a kifejezést a jelentéstől – ez alapján történik a sorok feldolgozása.">
                                    <Info />
                                </Tooltip>
                            </Stack>
                            <Stack sx={{ flexDirection: "column", width: 200 }} >
                                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                                    <Typography>tabulátor</Typography>
                                    <Radio
                                        checked={separator === 'tab'}
                                        onChange={handleSeparatorChange}
                                        value="tab"
                                        name="radio-buttons"
                                    />
                                </Stack>
                                <Divider orientation="vertical" flexItem />
                                <Stack direction="row" alignItems="center" justifyContent="space-between">

                                    <Typography>szóköz</Typography>
                                    <Radio
                                        checked={separator === 'ws'}
                                        onChange={handleSeparatorChange}
                                        value="ws"
                                        name="radio-buttons"
                                    />
                                </Stack>
                                <Divider orientation="vertical" flexItem />

                                <Stack direction="row" gap={1} alignItems="center" justifyContent="space-between">
                                    <Typography>egyéni: </Typography>
                                    <TextField size="small" sx={{ width: 100 }} onChange={(e) => setCustomSeparator(e.target.value)} />
                                </Stack>


                            </Stack>
                        </Stack>
                        <Divider flexItem />
                        <Stack gap={2}>

                            {terms.map((term, index) => (
                                <Fragment key={index}>
                                    <Stack component={Paper} sx={{
                                        width: "100%",
                                        flexDirection: { xs: "column", sm: "row" },
                                        gap: { xs: 1, sm: 2 },
                                        alignItems: { xs: "flex-start", sm: "center" },
                                        border: "none",
                                        p: 2,
                                        backgroundColor: "background.paper"
                                    }}>

                                        <Stack direction="row" gap={1} alignItems="center" sx={{ flex: 0.6, }}>
                                            <Typography>
                                                {term.term.content}
                                            </Typography>
                                        </Stack>

                                        <Divider flexItem orientation={!isMobile ? "vertical" : "horizontal"} />
                                        <Stack direction="row" gap={1} alignItems="center" sx={{ flex: 1 }}>

                                            <Typography>
                                                {term.definition.content.map((word, index) => word + (index < term.definition.content.length - 1 ? ", " : ""))}
                                            </Typography>

                                        </Stack>


                                    </Stack>
                                </Fragment>

                            ))}

                        </Stack>

                    </Stack>

                </ModalOverlay>


            </Modal>
        </Fragment >


    )
}

export default ImportForm