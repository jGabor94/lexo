"use server"

import { signIn } from "@/features/authentication//lib/auth"

const SA_googleSignIn = async () => {
    try {
        await signIn("google")
        return
    } catch (error: any) {
        throw error;
    }
}

export default SA_googleSignIn