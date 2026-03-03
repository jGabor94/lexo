"use client"

import { Alert, Button, Stack, TextField } from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

const CredentialsSingIn: FC<{}> = () => {

    const [error, setError] = useState<string | null>(null)

    const { register, handleSubmit, formState, reset } = useForm<{ email: string, password: string }>();

    const router = useRouter()

    const onSubmit = handleSubmit(async ({ email, password }) => {
        const res = await signIn("credentials", { email, password, redirect: false })
        if (res.error) {
            if (res.code === "credentials") setError("Hibás bejentkezési adatok")
            else if (res.code === "email-verified-error") setError("Email nincs megerősítve")
            else setError("Váratlan hiba")
        }
        else {
            router.refresh()
            reset()
        }
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