import axios from 'axios'
import https from 'https'

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

export const passwordBookAPI = axios.create({
  baseURL: process.env.PASSWORD_BOOK_URL
})

export const hrbookAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HRBOOK_URL
})

export const kpiAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KPI_URL,
  httpsAgent
})
