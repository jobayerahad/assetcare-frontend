import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { login } from '@actions/auth'
import { getProfile } from '@actions/profile'
import { SessionUser } from '@types'

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        empId: { label: 'Employee ID', type: 'number' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.empId || !credentials?.password) throw new Error('Employee ID and password are required')

          await login(credentials.empId, credentials.password)
          const profile = await getProfile(+credentials.empId)

          return {
            ...profile,
            id: credentials.empId
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred'
          throw new Error(errorMessage)
        }
      }
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user
      return token
    },

    session: async ({ session, token }) => {
      if (token?.user) session.user = token.user as SessionUser
      return session
    }
  },

  session: {
    maxAge: 60 * 60, // 1 hour
    updateAge: 24 * 60 * 60 // Optional: Update token if it’s older than 24 hours
  },

  jwt: {
    maxAge: 4 * 60 * 60 // 4 hours
  },

  pages: {
    signIn: '/sign-in'
  }
}
