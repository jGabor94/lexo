"use server"

import { signIn } from "@/features/authentication/lib/auth"

const SA_SignIn = async (email: string, password: string) => {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false
        })
        return {
            success: true,
            error: null
        }
    } catch (err) {
        return {
            success: false,
            error: "Invalid credential data"
        }
    }


}

export default SA_SignIn