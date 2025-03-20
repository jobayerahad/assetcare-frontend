'use server'

import { AxiosError } from 'axios'
import { revalidatePath } from 'next/cache'

import api from '@utils/api'
import { StatusMsg } from '@config/constants'
import { PaginationResponse, TCategory, TCategoryParams, ActionResponse } from '@types'

export const getCategories = async (params: TCategoryParams): Promise<PaginationResponse<TCategory> | null> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/categories', { params })

    return data
  } catch (error) {
    return null
  }
}

export const addCategory = async (formData: Partial<TCategory>): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    await apiObj.post('/categories', formData)

    revalidatePath('/categories')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Category added successfully!'
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}
