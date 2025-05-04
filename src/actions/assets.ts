'use server'

import { AxiosError } from 'axios'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'

import api from '@utils/api'
import { StatusMsg } from '@config/constants'
import { ActionResponse, SearchParams, TAssetForm } from '@types'

export const getAssets = async (params: SearchParams) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/assets', {
      params: { ...params, include: 'branch,product,product.category' }
    })

    return data
  } catch (error) {
    notFound()
  }
}

export const getAllAsset = async () => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/assets/all')

    return data
  } catch (error) {
    notFound()
  }
}

export const addAsset = async (formData: TAssetForm): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post('/assets', formData)

    revalidatePath('/assets')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown exception occured'
    }
  }
}

export const updateAsset = async (id: number, formData: TAssetForm): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.put(`/assets/${id}`, formData)

    revalidatePath('/assets')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown exception occured'
    }
  }
}

export const deleteAsset = async (id: number): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    await apiObj.delete(`/assets/${id}`)

    revalidatePath('/assets')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Asset deleted successfully'
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown exception occured'
    }
  }
}
