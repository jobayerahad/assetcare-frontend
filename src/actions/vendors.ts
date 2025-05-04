'use server'

import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'

import api from '@utils/api'
import { StatusMsg } from '@config/constants'
import { ActionResponse, SearchParams, TVendor } from '@types'

export const getVendors = async (params: SearchParams) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/vendors', { params })

    return data
  } catch (error) {
    notFound()
  }
}

export const getAllVendors = async () => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/vendors/all')

    return data.data
  } catch (error) {
    notFound()
  }
}

export const addVendor = async (formData: Partial<TVendor>): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post('/vendors', formData)

    revalidatePath('/vendors')

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

export const updateVendor = async (id: number, formData: Partial<TVendor>): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.put(`/vendors/${id}`, formData)

    revalidatePath('/vendors')

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

export const deleteVendor = async (id: number): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    await apiObj.delete(`/vendors/${id}`)

    revalidatePath('/vendors')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Vendor deleted successfully'
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof Error ? error.message : 'An unknown exception occured'
    }
  }
}
