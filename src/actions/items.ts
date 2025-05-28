'use server'

import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'

import api from '@utils/api'
import { StatusMsg } from '@config/constants'
import { handleError } from '@utils/helpers'
import { ActionResponse, SearchParams, TAssetItemForm } from '@types'

export const getItems = async (params: SearchParams) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/items', {
      params: { ...params, include: 'brand,product.category' }
    })

    return data
  } catch (error) {
    notFound()
  }
}

export const getAllItems = async (productId: string) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get(`/products/${productId}/items`)

    return data.data
  } catch (error) {
    return []
  }
}

export const addItem = async (formData: TAssetItemForm): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post('/items', formData)

    revalidatePath('/items')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}

export const updateItem = async (id: number, formData: TAssetItemForm): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.put(`/items/${id}`, formData)

    revalidatePath('/items')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}

export const deleteItem = async (id: number): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    await apiObj.delete(`/items/${id}`)

    revalidatePath('/items')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Item deleted successfully'
    }
  } catch (error) {
    return handleError(error)
  }
}
