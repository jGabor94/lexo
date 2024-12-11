import { db } from "@/drizzle/db"
import { setsTable, termsTable, usersTable } from "@/drizzle/schema"
import { desc, eq, getTableColumns } from "drizzle-orm"

const { userid: _, ...setsTableColumns } = getTableColumns(setsTable)
const { image, name } = getTableColumns(usersTable)

export default () => db.select({
    ...setsTableColumns,
    user: { image, name },
    termsCount: db.$count(termsTable, eq(setsTable.id, termsTable.setid))
})
    .from(setsTable)
    .leftJoin(usersTable, eq(setsTable.userid, usersTable.id))
    .orderBy(desc(setsTable.createdAt))
    .$dynamic()

