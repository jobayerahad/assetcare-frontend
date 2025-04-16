import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth-options'

const api = async () => {
  const session = await getServerSession(authOptions)

  const headers: Record<string, string> = {}

  if (session) headers['Authorization'] = `Bearer ${session.user.access_token}`

  return axios.create({
    baseURL: process.env.BACKEND_URL,
    headers
  })
}

export default api
