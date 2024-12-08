import { db } from "@/drizzle/db";
import { favoriteSetsTable, setsTable, termsTable, usersTable } from "@/drizzle/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";

const { userid: _, ...setsTableColumns } = getTableColumns(setsTable)
const { image, name } = getTableColumns(usersTable)

export default (userid: string) => db.select({
    ...setsTableColumns,
    user: { image, name },
    termsCount: db.$count(termsTable, eq(setsTable.id, termsTable.setid))
})
    .from(setsTable)
    .where(sql`${setsTable.id} IN (SELECT setid FROM ${favoriteSetsTable} WHERE ${favoriteSetsTable.userid} = ${userid})`)
    .leftJoin(usersTable, eq(setsTable.userid, usersTable.id))
    .orderBy(desc(setsTable.createdAt))
    .$dynamic()



