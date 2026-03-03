"use client"

import { Button, ButtonProps } from "@mui/material"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FC } from "react"

const SignOutButton: FC<ButtonProps> = ({ onClick, ...rest }) => {

    const router = useRouter()

    const handleClick = async () => {
        await signOut()
        router.push("/")
    }

    return (
        <Button variant="outlined" color="button" onClick={handleClick} {...rest}>Kijelentkezés</Button>
    )
}

export default SignOutButton