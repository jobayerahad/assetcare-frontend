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
