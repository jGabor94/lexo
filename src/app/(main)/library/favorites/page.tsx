import { auth } from "@/features/authentication/lib/auth";
import SetList from "@/features/set/components/SetList";
import getFavorites from "@/features/set/queries/getFavorites";
import { createObjectId } from "@/utils";
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