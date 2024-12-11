"use server"

import { signOut } from "@/features/authentication/lib/auth"

const SA_signOut = async () => {
    await signOut({ redirectTo: "/login" })
    return
}

export default SA_signOut