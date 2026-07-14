"use client"

import LinearLoading from '@/components/LinearLoading'
import ModalOverlay from '@/components/ui/ModalOverlay'
import useModalControl from '@/hooks/useModalControl'
import useDal from '@/lib/dal/useDal'
import { zodResolver } from '@hookform/resolvers/zod'
import { Autocomplete, Button, Chip, Modal, Stack, TextField, Typography } from '@mui/material'
import { UserPlus } from 'lucide-react'
import { ClipboardEvent, FC, Fragment, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { inviteToClass as inviteToClassAction } from '../../dal/mutations'
import { dedupe, splitTokens } from '../../lib/utils'
import { Class, InviteInputs, InviteType } from '../../types'
import { inviteFormSchema } from '../../zod/schema'

const InviteForm: FC<{ classData: Class, type: InviteType }> = ({ classData, type }) => {
    const modalControl = useModalControl()
    const [inputValue, setInputValue] = useState("")

    const form = useForm<InviteInputs>({
        mode: "all",
        defaultValues: {
            emails: []
        },
        resolver: zodResolver(inviteFormSchema([...classData.students, ...classData.teachers]))
    })

    const { action: inviteToClass } = useDal(inviteToClassAction, {
        alerts: {
            success: { severity: "success", content: "Tanulók sikeresen meghívva 🙂" },
        },
    })

    const submit: SubmitHandler<InviteInputs> = async (data) => {
        await inviteToClass(classData.id, data.emails, type)
        closeModal()
    }

    const closeModal = () => {
        modalControl.handleClose()
        setInputValue("")
        form.reset()
    }

    const title = type === "student" ? "Tanulók meghívása" : "Tanárok meghívása"

    return (
        <Fragment>
            <Button variant="contained" color="button" startIcon={<UserPlus size={16} />} sx={{ borderRadius: 3 }} onClick={modalControl.handleOpen}>
                {title}
            </Button>
            <Modal open={modalControl.open} onClose={closeModal} keepMounted={true}>
                <form onSubmit={form.handleSubmit(submit)}>
                    <ModalOverlay width={500} onClose={closeModal}>
                        <LinearLoading loading={form.formState.isSubmitting} />
                        <Stack gap={2}>
                            <Typography fontSize={23}>{title}</Typography>

                            <Controller
                                control={form.control}
                                name="emails"
                                render={({ field: { onChange, value }, formState }) => (
                                    <Autocomplete
                                        multiple
                                        freeSolo
                                        options={[]}
                                        value={value || []}
                                        inputValue={inputValue}
                                        slotProps={{
                                            popper: { style: { display: 'none' } }
                                        }}
                                        onInputChange={(_, newInputValue) => {
                                            const endsWithSeparator = /[\s,;]+$/.test(newInputValue)
                                            const tokens = splitTokens(newInputValue)

                                            if (tokens.length === 0) setInputValue("")

                                            if (endsWithSeparator) {
                                                onChange(dedupe([...(value || []), ...tokens]))
                                                setInputValue("")
                                            }

                                            if (tokens.length > 1) {
                                                onChange(dedupe([...(value || []), ...tokens.slice(0, -1)]))
                                                setInputValue(tokens[tokens.length - 1] || "")
                                            }

                                            setInputValue(newInputValue)
                                        }}
                                        onChange={(_, newValue, reason) => {
                                            if (reason === "createOption") {
                                                const lastValue = newValue[newValue.length - 1]
                                                const tokens = typeof lastValue === "string" ? splitTokens(lastValue) : []

                                                onChange(dedupe([
                                                    ...newValue.slice(0, -1).map((item) => item.toString()),
                                                    ...tokens
                                                ]))
                                                setInputValue("")
                                                return
                                            }

                                            onChange(dedupe(newValue.map((item) => item.toString())))
                                        }}
                                        renderValue={(selected, getTagProps) =>
                                            selected.map((option, index) => (
                                                <Chip label={option} {...getTagProps({ index })}
                                                    sx={{
                                                        opacity: classData.students.some(s => s.email === option) ? 0.5 : 1,
                                                    }}
                                                    key={index} />
                                            ))}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="E-mail cimek..."
                                                slotProps={{
                                                    htmlInput: {
                                                        ...params.inputProps,
                                                        onPaste: (event: ClipboardEvent<HTMLInputElement>) => {
                                                            const pastedText = event.clipboardData.getData("text")
                                                            const tokens = splitTokens(pastedText)

                                                            if (tokens.length > 1) {
                                                                event.preventDefault()
                                                                onChange(dedupe([...(value || []), ...tokens]))
                                                                setInputValue("")
                                                            }
                                                        }
                                                    }
                                                }}

                                                error={!!form.formState.errors.emails}
                                                helperText={form.formState.errors.emails?.message}
                                            />
                                        )}
                                    />
                                )}
                            />

                            <Button type="submit" variant="contained" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                                Küldés
                            </Button>
                        </Stack>
                    </ModalOverlay>
                </form>
            </Modal>
        </Fragment>
    )
}

export default InviteForm
