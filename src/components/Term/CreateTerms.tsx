'use client'

import SA_CreateTerms from "@/lib/actions/term/createTerms";
import { LanguageCode } from "@/lib/assets/language_tools/types";
import useAction from "@/lib/assets/serverAction/useAction";
import { ITerm } from "@/lib/database/types";
import useAlert from "@/lib/hooks/useAlert";
import useSet from "@/lib/hooks/useSet";
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Divider, IconButton, Modal, Paper, Stack, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import TermForm from "./TermForm";


export type Inputs = {
    terms: Array<ITerm>
}


const CreateTerms: FC<{}> = () => {

    const { set, mutate } = useSet()

    const scrollableDivRef = useRef<HTMLDivElement>(null);
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const initRow: ITerm = {
        term: {
            content: "",
            lang: set?.preferredTermLang.langCode as LanguageCode
        },
        definition: {
            content: [],
            lang: set?.preferredDefinitionLang.langCode as LanguageCode
        }
    }

    const form = useForm<Inputs>({ defaultValues: { terms: [initRow] } });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "terms",
    });

    const { setAlert } = useAlert()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        form.reset()
    };

    const { action: createTerms } = useAction(SA_CreateTerms, {
        200: { severity: "success", content: "Terms successfully added 🙂" }
    })


    const submit: SubmitHandler<Inputs> = async ({ terms }) => {

        const res = await createTerms(terms, set?._id as string)

        if (res.statusCode === 200) {
            mutate()
            handleClose()
        }
    }

    const scrollToBottom = () => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    });

    useEffect(() => {
        if (form.formState.submitCount > 0 && form.formState.isSubmitSuccessful !== true) {
            if (!form.formState.isValid) {
                setAlert({ severity: "error", content: "Whoops! You did not fill in some fields 😔" })
            }
        }
    }, [form.formState.submitCount])


    return (
        <Fragment>
            <Button variant="contained" onClick={handleOpen} startIcon={<AddIcon />}>
                Add Terms
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box component={Paper} sx={{
                    boxShadow: 10,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 1200,
                    maxWidth: "95%",
                    outline: "none",
                    height: 700,

                }}>
                    <Stack >
                        <Stack direction="row" gap={2} p={2}>
                            <Button variant="outlined" onClick={() => append(initRow)} startIcon={<AddIcon />}>
                                New term
                            </Button>
                            <Button variant="contained" onClick={form.handleSubmit(submit)} startIcon={<SaveIcon />} disabled={!form.formState.isValid || form.formState.isSubmitting}>
                                Save
                            </Button>
                        </Stack>
                        <Divider flexItem />
                        <Stack gap={2} sx={{ height: 500, overflowY: "scroll", boxSizing: "content-box", p: 2 }} ref={scrollableDivRef}>
                            {fields.map((field, index) => (
                                <Paper variant="elevation" key={field.id} sx={{ p: 2 }}>
                                    <Stack direction="row" gap={2} alignItems="center" >
                                        <TermForm {...{ form, prefix: `terms.${index}.` }} />
                                        {isMobile && (<Divider orientation="vertical" flexItem />)}
                                        <Tooltip title="Delete" sx={{ height: "fit-content" }}>
                                            <IconButton onClick={() => remove(index)} >
                                                <DeleteForeverIcon />
                                            </IconButton >
                                        </Tooltip>
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>

                    </Stack >
                </Box>
            </Modal >
        </Fragment >


    );
}


export default CreateTerms