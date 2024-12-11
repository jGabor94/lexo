import { auth } from "@/features/authentication/lib/auth";
import SetList from "@/features/set/components/SetList";
import getFavorites from "@/features/set/queries/getFavorites";
import { FC } from "react";

const Page: FC<{}> = async () => {

    const session = await auth()
    const sets = await getFavorites(session?.user.id as string)

    return <SetList {...{ sets }} />
}

export default Page