import { auth } from "@/features/authentication/lib/auth"

/** szerver oldali SET tulajdonos elleőrzésre szolgáló függvény */
export const getIsOwner = async (setUserId: string) => {
    const session = await auth()
    if (!session) return false
    return session.user.id === setUserId
}