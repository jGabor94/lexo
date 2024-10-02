import { SWRProvider } from '@/app/_providers/providers'
import { createObjectId } from '@/lib/assets/general'
import { getSet } from '@/lib/database/queries'
import { auth } from '@/lib/services/authentication/auth'
import { notFound } from 'next/navigation'
import { FC, ReactNode } from 'react'
import { unstable_serialize } from 'swr'

const layout: FC<{ params: { setid: string }, children: ReactNode }> = async ({ params, children }) => {

    const session = await auth()
    const set = await getSet(createObjectId(params.setid), createObjectId(session?.user._id as string))
    if (!set) notFound()

    return (
        <SWRProvider value={{ fallback: { [unstable_serialize(['set', set._id])]: set } }}>
            {children}
        </SWRProvider>
    )
}

export default layout