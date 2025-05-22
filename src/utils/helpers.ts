import { AxiosError } from 'axios'
import { StatusMsg } from '@config/constants'
import { ActionResponse, AssetStatus } from '@types'

export const capWords = (str: string, exceptions: string[] = []) => {
  const exceptionSet = new Set(exceptions.map((ex) => ex.toUpperCase()))

  return str
    ?.toLowerCase()
    .split(' ')
    .map((word) => {
      const upperWord = word.toUpperCase()
      return exceptionSet.has(upperWord) ? upperWord : word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export const paginateRes = <T>(data: T[], totalRecords: number, page: number, limit: number) => {
  const totalPages = Math.ceil(totalRecords / limit)

  return {
    data,
    paginationInfo: {
      totalRecords,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  }
}

export const handleError = (error: unknown): ActionResponse => ({
  status: StatusMsg.BAD_REQUEST,
  message: error instanceof AxiosError ? error.response?.data.message : 'An unknown exception occurred'
})

export const getAssetStatus = (status: AssetStatus) => {
  const statusMap = {
    pending: { label: 'Pending', color: 'orange' },
    in_progress: { label: 'In Progress', color: 'blue' },
    under_repair: { label: 'Under Repair', color: 'blue' },
    repaired: { label: 'Repaired', color: 'green' },
    active: { label: 'Active', color: 'green' },
    returned_to_branch: { label: 'Returned to Branch', color: 'teal' },
    scrapped: { label: 'Scrapped', color: 'red' }
  }

  return statusMap[status] || { label: 'Unknown', color: 'gray' }
}
