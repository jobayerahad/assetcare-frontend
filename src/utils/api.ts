import axios from 'axios'

export const passwordBookAPI = axios.create({
  baseURL: process.env.PASSWORD_BOOK_URL
})

export const interbridgeAPI = axios.create({
  baseURL: process.env.INTERBRIDGE_URL,
  headers: {
    'x-auth-token': process.env.INTERBRIDGE_TOKEN
  }
})
