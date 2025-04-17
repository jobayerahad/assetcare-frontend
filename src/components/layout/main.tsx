'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ModalsProvider } from '@mantine/modals'

import Shell from './shell'

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

const AuthLayout = ({ children }: Props) => (
  <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <ModalsProvider>
        <Shell>{children}</Shell>
      </ModalsProvider>
    </QueryClientProvider>
  </SessionProvider>
)

export default AuthLayout
