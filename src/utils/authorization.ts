import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

import { getIP } from '@actions/ip'
import { authOptions } from '@utils/auth-options'

export const isAdminAllowed = async () => {
  const ip = await getIP()
  const allowedIpPrefixes = ['172.19.100.', '172.19.63.']

  const isAllowed = allowedIpPrefixes.some((prefix) => ip?.startsWith(prefix))

  if (!isAllowed && process.env.NODE_ENV === 'production') notFound()
}

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  return session.user
}
