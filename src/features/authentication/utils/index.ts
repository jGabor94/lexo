import { Next } from '@/lib/serverAction/createServerAction/types'
import { createServerActionResponse } from '@/lib/serverAction/response/response'
import { Session } from 'next-auth'
import { auth } from '../lib/auth'

export const isLogged = async (next: Next, req: { session: Session }) => {
  const session = await auth()
  if (session) {
    req.session = session
    return next()
  } else {
    return createServerActionResponse({ status: 401, error: "You are not logged in" })
  }

}
