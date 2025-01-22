import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { getSession, login, removeSession } from '@actions/auth'
import { getProfile } from '@actions/profile'
import { getIP } from '@actions/ip'
import { StatusMsg } from '@config/constants'
import { EmployeeInfo } from '@types'

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

          const loginData = await login(credentials?.empId, credentials?.password)

          const empData = await getProfile(loginData.emp_id)
          const ip = await getIP()
          let session = await getSession(loginData.emp_id, loginData.brCode, ip)

          if (session.status !== StatusMsg.SUCCESS) {
            await removeSession(credentials.empId)
            session = await getSession(loginData.emp_id, loginData.brCode, ip)
          }

          if (session.status !== StatusMsg.SUCCESS) throw new Error(session.status)

          return {
            id: loginData.emp_id,
            empKey: +loginData.empKeyId,
            brCode: loginData.brCode,
            sessionKey: session.data,
            ...empData
          }
        } catch (error: any) {
          throw new Error(error.response ? error.response.data?.message : error.message)
        }
      }
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user as EmployeeInfo
      return token
    },

    session: async ({ session, token }) => {
      if (token) session.user = token.user as EmployeeInfo
      return session
    }
  },

  session: {
    maxAge: 60 * 60 // 1 hour
  },

  jwt: {
    maxAge: 60 * 60 // 1 hour
  },

  pages: {
    signIn: '/sign-in'
  }
}
