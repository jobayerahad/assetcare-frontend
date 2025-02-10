import { BiCheckCircle as SuccessIcon } from 'react-icons/bi'
import { MdOutlineErrorOutline as ErrorIcon } from 'react-icons/md'

import { StatusMsg } from '@config/constants'
import { StatusMessageProps } from '@types'

export const getMessage = (data: StatusMessageProps) => ({
  title: data.status,
  icon: data.status === StatusMsg.SUCCESS ? <SuccessIcon /> : <ErrorIcon />,
  message: data.message,
  color: data.status === StatusMsg.SUCCESS ? 'green' : 'red'
})
