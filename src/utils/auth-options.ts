import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { login } from '@actions/auth'
import { Employee } from '@types'
import { getProfile } from '@actions/profile'

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
      if (user) {
        token.user = user
        token.lastActivity = Date.now() // Store the timestamp of the last activity
      } else if (token.lastActivity) {
        const now = Date.now()
        const elapsed = (now - (token.lastActivity as number)) / 1000 // Time elapsed in seconds
        const timeout = 30 * 60 // 30 minutes in seconds
        if (elapsed > timeout) throw new Error('Session expired due to inactivity')
      }
      token.lastActivity = Date.now() // Update activity timestamp
      return token
    },

    session: async ({ session, token }) => {
      if (token?.user) session.user = token.user as Employee
      return session
    }
  },

  session: {
    strategy: 'jwt',
    maxAge: 4 * 60 * 60, // 4 hours
    updateAge: 30 * 60 // Extend session every 30 minutes
  },

  jwt: {
    maxAge: 4 * 60 * 60 // 4 hours
  },

  pages: {
    signIn: '/sign-in'
  }
}
