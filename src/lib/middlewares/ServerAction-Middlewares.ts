import { Session } from 'next-auth'
import { auth } from '../services/authentication/auth'
import { createServerActionResponse } from '../assets/serverAction/response/response'
import { Next } from '../assets/serverAction/createServerAction/types'

/*
  Felhasználó authentikációjának elleőrzése
*/

export const isLogged = async (next: Next, req: { session: Session }) => {
  const session = await auth()
  if (session) {
    req.session = session
    return next()
  } else {
    return createServerActionResponse({ status: 401, error: "You are not logged in" })
  }

}
