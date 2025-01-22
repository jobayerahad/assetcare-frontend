import NextAuth from 'next-auth'

import { UserRole } from '@config/constants'
import { Employee } from '@types'

declare module 'next-auth' {
  interface Session {
    user: Employee
  }
}
