'use server'

import { notFound } from 'next/navigation'

import api from '@utils/api'
import { LogSearchParams } from '@types'

export const getLogs = async (params: LogSearchParams) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/logs', { params })

    return data
  } catch (error) {
    notFound()
  }
}

export const getLogFilters = async () => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/logs/filters')

    return data.data
  } catch (error) {
    return null
  }
}
