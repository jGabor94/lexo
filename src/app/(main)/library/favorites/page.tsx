import SetList from "@/components/set/SetList";
import { createObjectId } from "@/lib/assets/general";
import getFavorites from "@/lib/database/queries/getFavorites";
import { auth } from "@/lib/services/authentication/auth";
import { FC } from "react";
export const revalidate = 0


const Page: FC<{}> = async () => {

    const session = await auth()

    const sets = await getFavorites([
        { $match: { _id: createObjectId(session?.user._id as string) } },
    ])

    return <SetList {...{ sets }} />
}

export default Page