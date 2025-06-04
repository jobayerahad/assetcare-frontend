'use server'

import api from '@utils/api'
import { StatusMsg } from '@config/constants'
import { handleError } from '@utils/helpers'
import { ActionResponse, TRepairHistoryForm } from '@types'

export const getRepairReport = async (params: TRepairHistoryForm): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/asset-repairs/history', { params })

    return {
      status: StatusMsg.SUCCESS,
      message: data.message,
      data: data.data
    }
  } catch (error) {
    return handleError(error)
  }
}
