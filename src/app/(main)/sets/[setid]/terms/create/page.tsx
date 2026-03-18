
import { getSet } from '@/features/set/dal/queries'
import CreateTerms from '@/features/term/components/CreateTerms'
import { FC } from 'react'



const Page: FC<{ params: Promise<{ setid: string }> }> = async ({ params }) => {

    const { setid } = await params

    const res = await getSet(setid)
    if (!res.success) return <>Hiba {res.error.type}</>
    const { data: set } = res

    return <CreateTerms {...{ set }} />

}

export default Page