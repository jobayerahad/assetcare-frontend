import { BiCheckCircle as SuccessIcon } from 'react-icons/bi'
import { MdOutlineErrorOutline as ErrorIcon } from 'react-icons/md'

import { StatusMsg } from '@config/constants'

type Props = {
  status: StatusMsg
  message: string
}

export const getMessage = (data: Props) => ({
  title: data.status,
  icon: data.status === StatusMsg.SUCCESS ? <SuccessIcon /> : <ErrorIcon />,
  message: data.message,
  color: data.status === StatusMsg.SUCCESS ? 'green' : 'red'
})
