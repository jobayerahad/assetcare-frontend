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
  current_page: number
  data: T[]
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}

export type ActionResponse = {
  status: StatusMsg
  message: string
  data?: any
}
