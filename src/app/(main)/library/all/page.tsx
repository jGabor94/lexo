import SetList from "@/components/set/SetList";
import { createObjectId } from "@/lib/assets/general";
import { getSets } from "@/lib/database/queries";
import { auth } from "@/lib/services/authentication/auth";
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