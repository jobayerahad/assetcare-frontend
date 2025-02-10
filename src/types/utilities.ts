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

export type TPaginatedRes<T> = {
  data: T[]
  paginationInfo: {
    totalRecords: number
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export type ActionResponse = {
  status: StatusMsg
  message: string
  data?: any
}
