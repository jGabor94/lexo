"use client"

import LinearLoading from '@/components/LinearLoading'
import useSet from '@/features/set/hooks/useSet'
import ImportForm from '@/features/term/components/ImportForm'
import TermForm from '@/features/term/components/TermCard/TermForm'
import { createTerms as createTermsAction } from '@/features/term/dal/mutations'
import { TermInput } from '@/features/term/types'
import { termFormSchema } from '@/features/term/zod/schema'
import useAlert from '@/hooks/useAlert'
import useAction from '@/lib/dal/useDal'
import { IconButtonGrey } from '@/lib/mui/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Divider, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { ArrowLeft, CircleMinus, Plus, PlusIcon, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, Fragment, useEffect, useRef } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'

export type Inputs = {
    terms: Array<TermInput>
}


const Page: FC<{}> = () => {

    const { set, mutate } = useSet()
    const router = useRouter()
    const { setAlert } = useAlert()

    const bottomRef = useRef<HTMLDivElement | null>(null);


    const initRow: TermInput = {
        term: {
            content: "",
            lang: set.preferredTermLang
        },
        definition: {
            content: [],
            lang: set.preferredDefinitionLang
        },
        exampleSentence: null
    }

    const form = useForm<Inputs>({
        defaultValues: { terms: [initRow] },
        resolver: zodResolver(z.object({ terms: z.array(termFormSchema) }))
    });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "terms",
        rules: { required: true },

    });

    const { action: createTerms } = useAction(createTermsAction, {
        "success": { severity: "success", content: "Kifejezések sikeresen hozzáadva 🙂" }
    })

    const submit: SubmitHandler<Inputs> = async ({ terms }) => {

        const error = await createTerms(terms, set?.id)

        if (!error) {
            mutate()
            router.push(`/sets/${set.id}`)
        }

    }

    const watched = form.watch("terms")
    const prevFieldArray = useRef<TermInput[]>([initRow])

    useEffect(() => {
        if (watched.length > prevFieldArray.current.length) {
            requestAnimationFrame(() => {
                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            })
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
                <Stack gap={8} position={"relative"}>
                    <Stack gap={3} sx={{ position: "sticky", top: 0, zIndex: 1000, py: 2, backgroundColor: "background.default" }}>

                        <Stack component={Paper} p={2} direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} >

                            <Stack direction="row" gap={1} alignItems="center" >
                                <IconButton onClick={() => router.push(`/sets/${set.id}`)} >
                                    <ArrowLeft />
                                </IconButton>
                                <Divider orientation="vertical" flexItem />
                                <Typography sx={{ textWrap: "nowrap" }}>
                                    Új kifejezés hozzáadása ide: <b>{set.name}</b>
                                </Typography>
                            </Stack>


                            <Stack direction="row" gap={1} >
                                <Tooltip title="Hozzáadás">
                                    <IconButtonGrey onClick={() => append(initRow)}>
                                        <PlusIcon />
                                    </IconButtonGrey>
                                </Tooltip>
                                <ImportForm append={append} />

                                <Tooltip title="Mentés">
                                    <IconButtonGrey type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid}>
                                        <Save />
                                    </IconButtonGrey>
                                </Tooltip>


                            </Stack>
                        </Stack>


                    </Stack>


                    <Stack p={1}>
                        <Stack gap={2} alignItems="center" mt={1} >
                            {fields.map((field, index) => (
                                <Box key={field.id} sx={{ p: 2, pt: 4, position: "relative", width: "100%", border: "none" }}>
                                    <Stack direction="row" gap={2} alignItems="center" >
                                        <TermForm key={index} {...{ form, prefix: `terms.${index}.` }} />
                                        <Tooltip title="Törlés" sx={{ height: "fit-content", position: "absolute", top: -6, right: -6 }}>
                                            <IconButton onClick={() => remove(index)}>
                                                <CircleMinus />

                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Box>
                            ))}
                            <Tooltip title="Hozzáadás" ref={bottomRef}>
                                <IconButton onClick={() => append(initRow)} sx={{
                                    width: "fit-content", backgroundColor: "primary.main", "&:hover": {
                                        backgroundColor: "primary.dark"
                                    }
                                }}>
                                    <Plus color="#ffffff" size={30} />
                                </IconButton>
                            </Tooltip>

                        </Stack>

                    </Stack >
                </Stack >
            </form >

        </Fragment >



    )
}

export default Page