"use client"

import SA_signOut from "@/lib/actions/user/signOut"
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
        <Button variant="outlined" onClick={handleClick} {...rest}>Sign Out</Button>
    )
}

export default SignOutButton