'use server'

import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'

import api from '@utils/api'
import { StatusMsg } from '@config/constants'
import { handleError } from '@utils/helpers'
import { ActionResponse, SearchParams, TBrand } from '@types'

export const getBrands = async (params: SearchParams) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/brands', { params })

    return data
  } catch (error) {
    notFound()
  }
}

export const getAllBrands = async () => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/brands/all')

    return data.data
  } catch (error) {
    notFound()
  }
}

export const addBrand = async (formData: Partial<TBrand>): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post('/brands', formData)

    revalidatePath('/brands')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}

export const updateBrand = async (id: number, formData: Partial<TBrand>): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.put(`/brands/${id}`, formData)

    revalidatePath('/brands')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}

export const deleteBrand = async (id: number): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    await apiObj.delete(`/brands/${id}`)

    revalidatePath('/brands')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Brand deleted successfully'
    }
  } catch (error) {
    return handleError(error)
  }
}
