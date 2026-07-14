"use client"

import AiButton from '@/components/ui/AiButton'
import ModalOverlay from '@/components/ui/ModalOverlay'
import { Set } from '@/features/set/types'
import useModalControl from '@/hooks/useModalControl'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, Stack, TextField, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { FC, Fragment } from 'react'
import { Controller, SubmitHandler, UseFieldArrayAppend, useForm } from 'react-hook-form'
import { generateTerms } from '../dal/mutations'
import { GenerateTermsInput } from '../types'
import { generateTermsSchema } from '../zod/schema'
import { Inputs } from './CreateTerms'

const GenerateTerms: FC<{ set: Set, append: UseFieldArrayAppend<Inputs, "terms"> }> = ({ set, append }) => {

    const modalControl = useModalControl()
    const { handleSubmit, formState, reset, register, control } = useForm<GenerateTermsInput>({
        mode: "all",
        defaultValues: {
            prompt: "",
            termNumber: 10,
            isExampleSentenceIncluded: false
        },
        resolver: zodResolver(generateTermsSchema)
    });

    const submit: SubmitHandler<GenerateTermsInput> = async ({ prompt, termNumber, isExampleSentenceIncluded }, e) => {

        const res = await generateTerms({
            prompt,
            termNumber,
            isExampleSentenceIncluded,
            preferredTermLang: set.preferredTermLang,
            preferredDefinitionLang: set.preferredDefinitionLang
        })

        if (res.success) {
            append(res.data.output.map((term) => ({
                ...term,
                generatedByAi: true,
            })))
            reset()
            modalControl.handleClose()

        }

    }

    return (
        <Fragment>
            <AiButton onClick={modalControl.handleOpen}>
                Generate AI
            </AiButton>
            <Modal
                open={modalControl.open}
                onClose={modalControl.handleClose}
                keepMounted={true}
            >

                <ModalOverlay width={500} onClose={modalControl.handleClose}>
                    <Stack gap={2}>
                        <Typography fontSize={23}>Kifejezések generálása</Typography>

                        <TextField {...register("prompt", { required: true })} label="Prompt" multiline rows={4} placeholder="Írd le milyen kifejezéseket szeretnél generálni..." />

                        <TextField
                            type='number'
                            {...register("termNumber", { required: true, valueAsNumber: true })}
                            label="Kifejezések száma"
                            slotProps={{ htmlInput: { max: 100, min: 0 } }}
                            helperText="Maximum 100 kifejezést lehet generálni."
                        />
                        <Stack direction="row" alignItems="center" gap={1}>
                            <Typography>Példa mondatok generálása:</Typography>
                            <Controller
                                control={control}
                                name="isExampleSentenceIncluded"
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <Checkbox
                                        checked={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                        </Stack>
                        <AiButton onClick={handleSubmit(submit)} disabled={formState.isSubmitting || !formState.isValid} >
                            Generálás
                        </AiButton>
                    </Stack>

                </ModalOverlay>

            </Modal >
        </Fragment>

    )
}

export default GenerateTerms
