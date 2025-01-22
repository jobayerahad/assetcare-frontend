'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ModalsProvider } from '@mantine/modals'

import Shell from './shell'

type Props = {
  children: ReactNode
}

const AuthLayout = ({ children }: Props) => (
  <SessionProvider>
    <ModalsProvider>
      <Shell>{children}</Shell>
    </ModalsProvider>
  </SessionProvider>
)

export default AuthLayout
