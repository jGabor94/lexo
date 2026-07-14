

import { db } from "@/drizzle/db";
import { users } from "../mock";
import { classToStudentsTable } from "../schema";

const classId = process.argv[2];

if (!classId) {
    console.error("❌ Missing classId argument!")
    process.exit(1);
};

(async () => {
    const usersResult = await db.query.usersTable.findMany({
        where: {
            username: {
                in: users.map((user) => user.username)
            }
        }
    })


    const insertedresult = await db.insert(classToStudentsTable).values(usersResult.map((user) => ({
        studentId: user.id,
        classId
    }))).returning()

    console.log({ insertedresult })

    await (db as any).client?.end?.()
    process.exit(0)
})()