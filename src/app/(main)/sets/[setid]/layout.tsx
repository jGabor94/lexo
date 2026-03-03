import { getSet } from '@/features/set/dal/queries';
import { SWRProvider } from '@/providers';
import { redirect } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { unstable_serialize } from 'swr';

const layout: FC<{ params: Promise<{ setid: string }>, children: ReactNode }> = async ({ params, children }) => {

    const { setid } = await params;
    const res = await getSet(setid)
    if (!res.success && res.error.type === "unauthenticated") redirect("/login")
    if (!res.success) return <>Hiba {res.error.type}</>
    const { data: set } = res

    return (
        <SWRProvider value={{ fallback: { [unstable_serialize(['setData', set.id])]: set } }}>
            {children}
        </SWRProvider>
    )
}

export default layout