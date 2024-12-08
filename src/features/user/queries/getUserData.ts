"use server"

import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"
import { eq, getTableColumns } from "drizzle-orm"


const getUserData = async (userid: string) => {
    const { password, ...userColumns } = getTableColumns(users)
    const [user] = await db.select(userColumns).from(users).where(eq(users.id, userid))
    return user
}

export default getUserData