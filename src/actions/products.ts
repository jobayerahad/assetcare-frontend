'use server'

import { revalidatePath } from 'next/cache'

import api from '@utils/api'
import { StatusMsg } from '@config/constants'
import { TProduct, ActionResponse, TProductForm } from '@types'

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
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof Error ? error.message : 'An unknown exception occured'
    }
  }
}

export const updateProduct = async (id: number, formData: Partial<TProduct>): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.put(`/products/${id}`, formData)

    revalidatePath('/products')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof Error ? error.message : 'An unknown exception occured'
    }
  }
}

export const deleteProduct = async (id: number): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    await apiObj.delete(`/products/${id}`)

    revalidatePath('/products')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Product deleted successfully'
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof Error ? error.message : 'An unknown exception occured'
    }
  }
}
