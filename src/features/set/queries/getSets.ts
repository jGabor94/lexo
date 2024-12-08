import { db } from "@/drizzle/db"
import { setsTable, termsTable, users } from "@/drizzle/schema"
import { desc, eq, getTableColumns } from "drizzle-orm"

const { userid: _, ...setsTableColumns } = getTableColumns(setsTable)
const { image, name } = getTableColumns(users)

export default () => db.select({
    ...setsTableColumns,
    user: { image, name },
    termsCount: db.$count(termsTable, eq(setsTable.id, termsTable.setid))
})
    .from(setsTable)
    .leftJoin(users, eq(setsTable.userid, users.id))
    .orderBy(desc(setsTable.createdAt))
    .$dynamic()

