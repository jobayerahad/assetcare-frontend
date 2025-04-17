import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

import { authOptions } from '@utils/auth-options'

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  return session.user
}
