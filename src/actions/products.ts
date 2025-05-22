'use server'

import { revalidatePath } from 'next/cache'

import api from '@utils/api'
import { StatusMsg } from '@config/constants'
import { handleError } from '@utils/helpers'
import { ActionResponse, TProductForm } from '@types'

export const getProducts = async (catId: string) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get(`/categories/${catId}/products`)

    return data.data
  } catch (error) {
    return []
  }
}

export const addProduct = async (formData: TProductForm): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { category, ...rest } = formData

    const { data } = await apiObj.post(`/categories/${category}/products`, rest)

    revalidatePath('/products')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}

export const updateProduct = async (productId: number, formData: TProductForm): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { category, ...rest } = formData

    const { data } = await apiObj.put(`/categories/${category}/products/${productId}`, rest)

    revalidatePath('/products')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}

export const deleteProduct = async (categoryId: number, productId: number): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    await apiObj.delete(`/categories/${categoryId}/products/${productId}`)

    revalidatePath('/products')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Product deleted successfully'
    }
  } catch (error) {
    return handleError(error)
  }
}
