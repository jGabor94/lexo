'use client'

import SA_CreateTerms from "@/lib/actions/term/createTerms";
import useAction from "@/lib/assets/serverAction/useAction";
import { ITerm } from "@/lib/database/types";
import useAlert from "@/lib/hooks/useAlert";
import useModalControl from "@/lib/hooks/useModalControl";
import useSet from "@/lib/hooks/useSet";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Divider, IconButton, Modal, Paper, Stack, Tooltip, useTheme } from "@mui/material";
import { FC, Fragment, useEffect, useRef } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import LinearLoading from "../LinearLoading";
import SubmitButton from "../SubmitButton";
import ModalOverlay from "../ui/modal";
import TermForm from "./TermForm";

export type Inputs = {
    terms: Array<ITerm>
}


const CreateTerms: FC<{}> = () => {

    const { set, mutate } = useSet()

    const scrollableDivRef = useRef<HTMLDivElement>(null);
    const theme = useTheme()

    const initRow: ITerm = {
        term: {
            content: "",
            lang: set.preferredTermLang
        },
        definition: {
            content: [],
            lang: set.preferredDefinitionLang
        }
    }

    const form = useForm<Inputs>({ defaultValues: { terms: [initRow] } });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "terms",
        rules: { required: true }
    });

    const { setAlert } = useAlert()

    const { open, handleOpen, handleClose } = useModalControl()

    const closeModal = () => {
        handleClose()
        form.reset()
    };

    const { action: createTerms } = useAction(SA_CreateTerms, {
        200: { severity: "success", content: "Terms successfully added 🙂" }
    })


    const submit: SubmitHandler<Inputs> = async ({ terms }) => {

        const res = await createTerms(terms, set?._id as string)

        if (res.statusCode === 200) {
            mutate()
            closeModal()
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
            <LinearLoading loading={form.formState.isSubmitting} />
            <Button variant="contained" onClick={handleOpen} startIcon={<AddIcon sx={{ color: "primary.contrastText" }} />}>
                Add Terms
            </Button>
            <Modal
                open={open}
                onClose={closeModal}
            >
                <ModalOverlay width={1200} height={700} sx={{ p: 0 }} onClose={closeModal}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <Stack >
                            <Stack direction="row" gap={2} p={2}>
                                <Button variant="outlined" onClick={() => append(initRow)} startIcon={<AddIcon sx={{ color: "primary.main" }} />}>
                                    New term
                                </Button>
                                <SubmitButton
                                    variant="contained"
                                    formState={form.formState}
                                    startIcon={<SaveIcon sx={{ color: "primary.contrastText" }} />}
                                >
                                    Save
                                </SubmitButton>

                            </Stack>
                            <Divider flexItem />
                            <Stack gap={2} sx={{ height: 500, overflowY: "scroll", boxSizing: "content-box", p: 2 }} ref={scrollableDivRef}>
                                {fields.map((field, index) => (
                                    <Paper variant="elevation" key={field.id} sx={{ p: 2, pt: 4, position: "relative" }}>
                                        <Stack direction="row" gap={2} alignItems="center" >
                                            <TermForm {...{ form, prefix: `terms.${index}.` }} />
                                            <Tooltip title="remove" sx={{ height: "fit-content", position: "absolute", top: -15, right: -15 }}>
                                                <IconButton onClick={() => remove(index)} >
                                                    <RemoveCircleOutlineOutlinedIcon />
                                                </IconButton >
                                            </Tooltip>
                                        </Stack>
                                    </Paper>
                                ))}
                            </Stack>

                        </Stack >
                    </form>
                </ModalOverlay>
            </Modal >
        </Fragment >


    );
}


export default CreateTerms