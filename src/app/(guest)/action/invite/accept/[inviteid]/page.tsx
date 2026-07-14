import { auth } from '@/features/authentication/lib/auth'
import ErrorInvite from '@/features/teach/components/invite/ErrorInvite'
import Invite from '@/features/teach/components/invite/Invite'
import WarningInvite from '@/features/teach/components/invite/WarningInvite'
import { getInvite } from '@/features/teach/dal/queries'
import { FC } from 'react'

const page: FC<{ params: Promise<{ inviteid: string }> }> = async ({ params }) => {

    const { inviteid } = await params
    const session = await auth()

    const res = await getInvite(inviteid)
    if (!res.success) return <ErrorInvite />
    if (session && res.data.email !== session.user.email) return <WarningInvite invite={res.data} />
    return <Invite invite={res.data} session={session} />

}

export default page
