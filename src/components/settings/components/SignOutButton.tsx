"use client"

import SA_signOut from "@/features/authentication/actions/signOut"
import { Button, ButtonProps } from "@mui/material"
import { useRouter } from "next/navigation"
import { FC } from "react"

const SignOutButton: FC<ButtonProps> = ({ onClick, ...rest }) => {

    const router = useRouter()

    const handleClick = async () => {
        await SA_signOut()
        router.refresh()
    }

    return (
        <Button variant="outlined" color="button" onClick={handleClick} {...rest}>Kijelentkezés</Button>
    )
}

export default SignOutButton