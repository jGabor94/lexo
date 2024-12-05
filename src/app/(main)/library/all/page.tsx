import { setsTable } from "@/drizzle/schema";
import { auth } from "@/features/authentication/lib/auth";
import SetList from "@/features/set/components/SetList";
import getSets from "@/features/set/queries/getSets";
import { eq } from "drizzle-orm";
import { FC } from "react";

const Page: FC<{}> = async () => {

    const session = await auth()
    const sets = await getSets().where(eq(setsTable.userid, session?.user.id as string))

    return <SetList {...{ sets }} />
}

export default Page