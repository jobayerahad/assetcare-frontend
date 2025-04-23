import { ReactNode } from 'react'
import { StatusMsg } from '@config/constants'

export type AppErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export type WrapperProps = {
  children: ReactNode
}

export type StatusMessageProps = {
  status: StatusMsg
  message: string
}

export type PaginationResponse<T> = {
  success: boolean
  message: string
  data: T[]
  meta: {
    current_page: number
    per_page: number
    total: number
    last_page: number
  }
}

export type ActionResponse = {
  status: StatusMsg
  message: string
  data?: any
}

export type SearchParams = {
  per_page: number
  page: number
  include: string
  search: string
}
