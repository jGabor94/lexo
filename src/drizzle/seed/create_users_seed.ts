

import { db } from "@/drizzle/db";
import { Role } from "@/features/authorization/types";
import bcrypt from "bcrypt";
import { users } from "../mock";
import { usersTable } from "../schema";


(async () => {

    const usersResult = await db.query.usersTable.findMany({
        where: {
            username: {
                in: users.map((user) => user.username)
            }
        }
    })


    const insertedresult = await db.insert(usersTable).values(users.filter((user) => !usersResult.some((existingUser) => existingUser.username === user.username)).map((user) => ({
        ...user,
        password: bcrypt.hashSync(user.password, 10),
        roles: user.roles as Role[],
        emailVerified: new Date(),
    }))).returning()


    await (db as any).client?.end?.()
    process.exit(0)
})()