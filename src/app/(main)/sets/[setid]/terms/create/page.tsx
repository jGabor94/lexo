"use client"

import LinearLoading from '@/components/LinearLoading'
import SubmitButton from '@/components/SubmitButton'
import useSet from '@/features/set/hooks/useSet'
import SA_CreateTerms from '@/features/term/actions/createTerms'
import TermForm from '@/features/term/components/TermForm'
import { TermInput } from '@/features/term/types'
import useAlert from '@/hooks/useAlert'
import useAction from '@/lib/serverAction/useAction'
import AddIcon from '@mui/icons-material/Add'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import SaveIcon from '@mui/icons-material/Save'
import { Button, Divider, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC, Fragment, useEffect, useRef } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

export type Inputs = {
    terms: Array<TermInput>
}

const scrollToBottom = () => {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
    });
};

const Page: FC<{}> = () => {

    const { set, mutate } = useSet()
    const router = useRouter()
    const { setAlert } = useAlert()

    const initRow: TermInput = {
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

    const { action: createTerms } = useAction(SA_CreateTerms, {
        200: { severity: "success", content: "Terms successfully added 🙂" }
    })

    const submit: SubmitHandler<Inputs> = async ({ terms }) => {

        const res = await createTerms(terms, set?.id)

        if (res.statusCode === 200) {
            mutate()
            router.push(`/sets/${set.id}`)
        }
    }

    const watched = form.watch("terms")
    const prevFieldArray = useRef<TermInput[]>([initRow])

    useEffect(() => {
        if (watched.length > prevFieldArray.current.length) {
            scrollToBottom();
        }
        prevFieldArray.current = watched
    }, [watched]);



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
            <form onSubmit={form.handleSubmit(submit)}>
                <Stack >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}
                        sx={{ position: "sticky", top: 60, zIndex: 1000, backgroundColor: "background.paper", p: 2, }}>

                        <Stack direction="row" gap={1} alignItems="center">
                            <Stack direction="row" gap={1} alignItems="center" >
                                <IconButton onClick={() => router.push(`/sets/${set.id}`)} >
                                    <ArrowBackIcon />
                                </IconButton>
                                <Divider orientation="vertical" flexItem />
                                <Typography sx={{ textWrap: "nowrap" }}>
                                    Add new term to the: <b>{set.name}</b>
                                </Typography>
                            </Stack>



                        </Stack>
                        <Stack direction="row" gap={2} >
                            <Button variant="outlined" onClick={() => append(initRow)} startIcon={<AddIcon sx={{ color: "primary.main" }} />}>
                                Add term
                            </Button>
                            <SubmitButton
                                variant="contained"
                                formState={form.formState}
                                startIcon={<SaveIcon sx={{ color: "primary.contrastText" }} />}
                            >
                                Save
                            </SubmitButton>

                        </Stack>
                    </Stack>


                    <Stack p={1}>
                        <Stack gap={2} alignItems="center" mt={1} >
                            {fields.map((field, index) => (
                                <Paper variant='elevation' elevation={1} key={field.id} sx={{ p: 2, pt: 4, position: "relative", width: "100%" }}>
                                    <Stack direction="row" gap={2} alignItems="center" >
                                        <TermForm key={index} {...{ form, prefix: `terms.${index}.` }} />
                                        <Tooltip title="Remove" sx={{ height: "fit-content", position: "absolute", top: -6, right: -6 }}>
                                            <IconButton onClick={() => remove(index)}>
                                                <RemoveCircleOutlineOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Paper>
                            ))}
                            <Tooltip title="Add">
                                <IconButton onClick={() => append(initRow)} sx={{ width: "fit-content", }}>
                                    <AddCircleIcon sx={{ color: "primary.main", width: 40, height: 40 }} />
                                </IconButton>
                            </Tooltip>

                        </Stack>

                    </Stack >
                </Stack >
            </form >
        </Fragment>



    )
}

export default Page