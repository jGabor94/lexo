"use client"

import useDal from "@/lib/dal/useDal";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FC, Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createChangeLog as createChangeLogAction } from "../dal/mutations";
import { ChangeLogInput } from "../types";


const ChangeLogForm: FC<{}> = () => {

    const { action: createChangeLog } = useDal(createChangeLogAction, {
        alerts: {
            success: { severity: "success", content: "Változásnapló sikeresen frissítve 🙂" }
        }
    })

    const { handleSubmit, formState, reset, register, setValue, getValues } = useForm<ChangeLogInput>({ defaultValues: { description: "", date: dayjs() } });

    const onSubmit: SubmitHandler<ChangeLogInput> = async ({ description, date }) => {

        const error = await createChangeLog({
            description,
            date: date ? new Date(date.toISOString()) : new Date()
        })

        if (!error) reset()

    }

    const handleDateChange = (value: Dayjs | null) => {
        if (value) setValue("date", value)
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={1}>
                    <TextField {...register("description", { required: true, minLength: 3 })} label="description" size="small" multiline rows={3} />
                    <DatePicker
                        slotProps={{ textField: { size: 'small' } }}
                        {...register("date")}
                        onChange={handleDateChange}
                        defaultValue={dayjs()}
                        maxDate={dayjs()} />
                    <LoadingButton
                        loading={formState.isSubmitting}
                        loadingPosition="center"
                        variant="contained"
                        type="submit"
                        disabled={formState.isSubmitting || !formState.isValid}
                    >
                        Send
                    </LoadingButton>
                </Stack>
            </form>
        </Fragment>
    )
}

export default ChangeLogForm
