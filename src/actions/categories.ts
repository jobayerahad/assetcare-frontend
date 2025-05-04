'use server'

import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'

import api from '@utils/api'
import { StatusMsg } from '@config/constants'
import { TCategory, ActionResponse, SearchParams } from '@types'

export const getCategories = async (params: SearchParams) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/categories', { params })

    return data
  } catch (error) {
    notFound()
  }
}

export const getAllCategory = async () => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/categories/all')

    return data.data
  } catch (error) {
    notFound()
  }
}

export const addCategory = async (formData: Partial<TCategory>): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post('/categories', formData)

    revalidatePath('/categories')

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

export const updateCategory = async (id: number, formData: Partial<TCategory>): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.put(`/categories/${id}`, formData)

    revalidatePath('/categories')

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

export const deleteCategory = async (id: number): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    await apiObj.delete(`/categories/${id}`)

    revalidatePath('/categories')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Category deleted successfully'
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof Error ? error.message : 'An unknown exception occured'
    }
  }
}
