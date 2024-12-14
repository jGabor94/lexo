import { auth } from '@/features/authentication/lib/auth'
import getIsFavorite from '@/features/set/queries/getIsFavorite'
import getSet from '@/features/set/queries/getSet'
import { SWRProvider } from '@/providers'
import { notFound } from 'next/navigation'
import { FC, ReactNode } from 'react'
import { unstable_serialize } from 'swr'

const layout: FC<{ params: { setid: string }, children: ReactNode }> = async ({ params, children }) => {

    const session = await auth()
    const set = await getSet(params.setid, session?.user.id as string)
    const favorite = await getIsFavorite(session?.user.id as string, params.setid)

    if (!set) notFound()

    return (
        <SWRProvider value={{ fallback: { [unstable_serialize(['setData', set.id])]: { set, favorite } } }}>
            {children}
        </SWRProvider>
    )
}

export default layout