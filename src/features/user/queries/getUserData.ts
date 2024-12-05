"use server"

import { db } from "@/drizzle/db"
import { eq, getTableColumns } from "drizzle-orm"
import { usersTable } from "../drizzle/schema"


const getUserData = async (userid: string) => {
    const { password, ...userColumns } = getTableColumns(usersTable)
    const [user] = await db.select(userColumns).from(usersTable).where(eq(usersTable.id, userid))
    return user
}

export default getUserData