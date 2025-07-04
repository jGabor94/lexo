"use client"

import SA_SignIn from '@/features/authentication/actions/signIn'
import { Alert, Button, Stack, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

const CredentialsSingIn: FC<{}> = () => {

    const [error, setError] = useState<string | null>(null)

    const { register, handleSubmit, formState, reset } = useForm<{ email: string, password: string }>();

    const router = useRouter()

    const onSubmit = handleSubmit(async ({ email, password }) => {
        const res = await SA_SignIn(email, password)
        res.success ? router.push("/home") : setError(res.error)
        reset()
    })

    return (
        <form onSubmit={onSubmit}>
            <Stack gap={2}>
                {error && (
                    <Alert variant="outlined" severity='error'>
                        {error}
                    </Alert>
                )}
                <TextField size="small" label="E-mail" {...register("email", { required: true, minLength: 3 })} />
                <TextField size="small" type='password' label="Jelszó" {...register("password", { required: true, minLength: 3 })} />
                <Button disabled={!formState.isValid || formState.isSubmitting} color="button" variant='contained' type="submit" >Belépés</Button>

            </Stack>
        </form>


    )
}

export default CredentialsSingIn