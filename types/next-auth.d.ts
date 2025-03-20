import NextAuth from 'next-auth'

import { UserRole } from '@config/constants'
import { SessionUser } from '@types'

declare module 'next-auth' {
  interface Session {
    user: SessionUser
  }
}
