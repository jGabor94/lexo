import { HorizontalList, HorizontalListSkeleton } from "@/components/horizontalList";
import { setsTable } from "@/drizzle/schema";
import { auth } from "@/features/authentication/lib/auth";
import getFavorites from "@/features/set/queries/getFavorites";
import { default as getSets } from "@/features/set/queries/getSets";
import GradeIcon from '@mui/icons-material/Grade';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Stack } from "@mui/material";
import { desc, eq, ne, sql } from "drizzle-orm";
import { FC, Suspense } from "react";

const Page: FC<{}> = async () => {

    const session = await auth()
    /*
        const latestSets = db.execute(sql`
      SELECT "sets".*, "sub_terms".*
      FROM (
        WITH ranked_terms AS (
          SELECT 
            ${termsTable}.*, 
            ${progressesTable}.updated_at as "progress_updated_at",
            ROW_NUMBER() OVER (PARTITION BY ${termsTable}.setid ORDER BY ${progressesTable}.updated_at DESC) AS row_num
          FROM ${progressesTable}
          RIGHT JOIN ${termsTable} ON ${progressesTable}.termid = ${termsTable}.id
          WHERE ${progressesTable}.userid = ${session?.user.id}
        )
        SELECT *
        FROM ranked_terms
        WHERE row_num = 1
      ) AS sub_terms
      RIGHT JOIN ${setsTable} ON "sub_terms"."setid" = ${setsTable}.id
      ORDER BY sub_terms.progress_updated_at DESC;
    `).then(res => res.rows)

    const { updatedAt, ...columns } = getTableColumns(progressesTable)

    const rankedTerms = db.$with('ranked_terms').as(
        db.select({ ...getTableColumns(termsTable), progress_updated_at: sql`${progressesTable}.updated_at`.as("progress_updated_at"), row_num: sql`ROW_NUMBER() OVER (PARTITION BY ${termsTable}.setid ORDER BY ${progressesTable}.updated_at DESC)`.as("row_num") })
            .from(progressesTable)
            .rightJoin(termsTable, eq(progressesTable.termid, termsTable.id))
            .where(eq(progressesTable.userid, session?.user.id as string))
    )

    const subterms = db.with(rankedTerms).select().from(rankedTerms).where(sql`row_num = 1`).as("sub_terms")

    const res = db.select({ ...getTableColumns(setsTable), progressUpdatedAt: subterms.progress_updated_at })
        .from(subterms)
        .rightJoin(setsTable, eq(subterms.setid, setsTable.id))
        .orderBy(desc(subterms.progress_updated_at))

    console.log(res.toSQL())
    console.log(await res)
    */
    const promises = {
        userRecentSets: getSets().where(eq(setsTable.userid, session?.user.id as string)).orderBy(desc(setsTable.updatedAt)).limit(10),
        otherNEwSets: getSets().where(ne(setsTable.userid, session?.user.id as string)).orderBy(sql`RANDOM()`).limit(10),
        favorites: getFavorites(session?.user.id as string).orderBy(sql`RANDOM()`).limit(10),
    }

    return (
        <Stack gap={5}>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promises.userRecentSets} label="Recent sets" icon={<NewReleasesIcon />} />
            </Suspense>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promises.favorites} label="My favorites" icon={<GradeIcon />} />
            </Suspense>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promises.otherNEwSets} label={"Other new sets"} icon={<PeopleAltIcon />} />
            </Suspense>
        </Stack >
    );
}

export default Page