"use client"

import LinearLoading from "@/components/LinearLoading"
import ModalOverlay from "@/components/ui/ModalOverlay"
import type { SetListItem } from "@/features/set/types"
import useModalControl from "@/hooks/useModalControl"
import useDal from "@/lib/dal/useDal"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Autocomplete,
    Button,
    Chip,
    Modal,
    Stack,
    TextField,
    Typography
} from "@mui/material"
import { ClipboardList } from "lucide-react"
import { FC, Fragment } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { createTask as createTaskAction } from "../../dal/mutations"
import type { Class, TaskInputs } from "../../types"
import { taskFormSchema } from "../../zod/schema"

const CreateTask: FC<{ classData: Class, ownSets: SetListItem[], variant?: "contained" | "outlined" }> = ({ classData, ownSets, variant = "contained" }) => {
    const modalControl = useModalControl()
    const form = useForm<TaskInputs>({
        mode: "all",
        defaultValues: {
            name: "",
            description: "",
            deadline: new Date().toISOString(),
            setIds: []
        },
        resolver: zodResolver(taskFormSchema)
    })

    const { action: createTask } = useDal(createTaskAction, {
        alerts: {
            success: { severity: "success", content: "Feladat sikeresen kiosztva." },
            "set-not-found": { severity: "error", content: "A kivalasztott gyujtemenyek kozul valamelyik nem talalhato." },
            "invalid-deadline": { severity: "error", content: "Ervenytelen hatarido." },
        },
    })

    const closeModal = () => {
        modalControl.handleClose()
        form.reset()
    }

    const submit: SubmitHandler<TaskInputs> = async (data) => {
        const res = await createTask(classData.id, data)
        if (res.success) closeModal()
    }


    return (
        <Fragment>
            <Button
                variant={variant}
                color={variant === "contained" ? "button" : undefined}
                startIcon={<ClipboardList size={16} />}
                sx={{
                    borderRadius: 3,
                    ...(variant === "outlined" ? {
                        color: "white",
                        borderColor: "rgba(255,255,255,0.28)"
                    } : {})
                }}
                onClick={modalControl.handleOpen}
            >
                Uj kiosztas
            </Button>
            <Modal open={modalControl.open} onClose={closeModal} keepMounted>
                <form onSubmit={form.handleSubmit(submit)}>
                    <ModalOverlay width={620} onClose={closeModal}>
                        <LinearLoading loading={form.formState.isSubmitting} />
                        <Stack gap={2.25}>
                            <Stack gap={0.5} sx={{ pr: 5 }}>
                                <Typography fontSize={23} fontWeight={700}>Új feladat kiosztása</Typography>
                                <Typography color="text.secondary">
                                    Válassz gyűjteményeket a saját könyvtáradból, majd adj meg határidőt.
                                </Typography>
                            </Stack>

                            <TextField
                                label="Feladat neve"
                                {...form.register("name")}
                                error={!!form.formState.errors.name}
                                helperText={form.formState.errors.name?.message}
                                fullWidth
                            />

                            <Controller
                                control={form.control}
                                name="setIds"
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <Autocomplete
                                        onClose={onBlur}
                                        multiple
                                        options={ownSets}
                                        value={ownSets.filter((set) => value.includes(set.id))}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, selected) => option.id === selected.id}
                                        onChange={(_, newValue) => onChange(newValue.map((set) => set.id))}
                                        noOptionsText="Nincs választható gyűjtemény"
                                        renderValue={(selected, getTagProps) =>
                                            selected.map((option, index) => (
                                                <Chip
                                                    label={option.name}
                                                    {...getTagProps({ index })}
                                                    key={option.id}
                                                />
                                            ))}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Gyűjtemények"
                                                placeholder="Keress a könyvtáradban..."
                                                error={!!form.formState.errors.setIds}
                                                helperText={form.formState.errors.setIds?.message}
                                            />
                                        )}
                                    />
                                )}
                            />

                            <TextField
                                label="Határidő"
                                type="datetime-local"
                                {...form.register("deadline")}
                                error={!!form.formState.errors.deadline}
                                helperText={form.formState.errors.deadline?.message}
                                slotProps={{ inputLabel: { shrink: true } }}
                                fullWidth
                            />

                            <TextField
                                label="Leírás"
                                {...form.register("description")}
                                multiline
                                minRows={3}
                                fullWidth
                            />

                            <Button type="submit" variant="contained" color="button" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                                Kiosztás
                            </Button>
                        </Stack>
                    </ModalOverlay>
                </form>
            </Modal>
        </Fragment>
    )
}

export default CreateTask
