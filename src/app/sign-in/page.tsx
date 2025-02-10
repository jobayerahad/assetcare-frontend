import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import SignInUI from './ui'
import { authOptions } from '@utils/auth-options'

export const metadata: Metadata = {
  title: 'Sign In'
}

type Props = { searchParams: Promise<{ callbackUrl: string }> }

const SignIn = async (props: Props) => {
  const searchParams = await props.searchParams
  const session = await getServerSession(authOptions)
  if (session) redirect(searchParams?.callbackUrl ? searchParams.callbackUrl : '/')

  return <SignInUI />
}

export default SignIn
