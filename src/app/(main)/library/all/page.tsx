import { auth } from "@/features/authentication/lib/auth";
import SetList from "@/features/set/components/SetList";
import getSets from "@/features/set/queries/getSets";
import { createObjectId } from "@/utils";
import { FC } from "react";

const Page: FC<{}> = async () => {

    const session = await auth()

    const sets = await getSets([
        { $match: { user: createObjectId(session?.user._id as string) } },
        { $sort: { createdAt: -1 } },
    ])

    return <SetList {...{ sets }} />
}

export default Page