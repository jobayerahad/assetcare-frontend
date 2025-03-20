import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth-options'

export const passwordBookAPI = axios.create({
  baseURL: process.env.PASSWORD_BOOK_URL
})

export const interbridgeAPI = axios.create({
  baseURL: process.env.INTERBRIDGE_URL,
  headers: {
    'x-auth-token': process.env.INTERBRIDGE_TOKEN
  }
})

const api = async () => {
  const session = await getServerSession(authOptions)

  const headers: Record<string, string> = {}

  if (session) headers['Authorization'] = `Bearer ${session.user.token}`

  return axios.create({
    baseURL: process.env.BACKEND_URL,
    headers
  })
}

export default api
