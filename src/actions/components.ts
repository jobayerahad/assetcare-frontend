'use server'

import { revalidatePath } from 'next/cache'

import api from '@utils/api'
import { StatusMsg } from '@config/constants'
import { handleError } from '@utils/helpers'
import { ActionResponse, TComponentForm } from '@types'

export const getComponents = async (catId: string) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get(`/products/${catId}/components`)

    return data.data
  } catch (error) {
    return []
  }
}

export const addComponent = async (formData: TComponentForm): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { category, product, ...rest } = formData

    const { data } = await apiObj.post(`/products/${product}/components`, rest)

    revalidatePath('/components')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}

export const updateComponent = async (componentId: number, formData: TComponentForm): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { category, ...rest } = formData

    const { data } = await apiObj.put(`/products/${category}/components/${componentId}`, rest)

    revalidatePath('/components')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}

export const deleteComponent = async (productId: number, componentId: number): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    await apiObj.delete(`/products/${productId}/components/${componentId}`)

    revalidatePath('/components')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Component deleted successfully'
    }
  } catch (error) {
    return handleError(error)
  }
}
