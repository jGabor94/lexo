"use client"

import SA_CreateChangeLog from "@/lib/actions/createChangeLog";
import useAction from "@/lib/assets/serverAction/useAction";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FC, Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


const ChangeLogForm: FC<{}> = () => {

    const { action: createChangeLog } = useAction(SA_CreateChangeLog, {
        200: { severity: "success", content: "ChangeLog updated 🙂" }
    })

    type Input = { description: string, date: Dayjs }


    const { handleSubmit, formState, reset, register, setValue, getValues } = useForm<Input>({ defaultValues: { description: "", date: dayjs() } });

    const onSubmit: SubmitHandler<Input> = async ({ description, date }) => {


        const res = await createChangeLog({
            description,
            date: date ? date.toISOString() : null
        })

        if (res.statusCode === 200) {
            reset()
        }

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
