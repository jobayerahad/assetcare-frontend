'use server'

import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'

import api from '@utils/api'
import { StatusMsg } from '@config/constants'
import { handleError } from '@utils/helpers'
import { ActionResponse, AssetSearchParams } from '@types'

export const getAssetMaintenances = async (params: AssetSearchParams) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/asset-repairs', {
      params: { ...params, include: 'asset.product.category,branch,division,vendor' }
    })

    return data
  } catch (error) {
    notFound()
  }
}

export const getAssetLatestTransfer = async (assetId: number) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get(`/assets/${assetId}/latest-transfer`)

    return data.data
  } catch (error) {
    return null
  }
}

export const getMaintenance = async (id: string) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get(`/asset-repairs/${id}}`, {
      params: { include: 'asset.product.category,branch,division,vendor' }
    })

    return data.data
  } catch (error) {
    notFound()
  }
}

export const scrapAsset = async (id: number, reason: string): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post(`/assets/${id}/scrap`, { reason })

    revalidatePath('/maintenance')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}

export const diagnosisAsset = async (id: number, formData: any): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.patch(`/asset-repairs/${id}/diagnosis`, formData)

    revalidatePath('/maintenance')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}

export const sendToVendorAsset = async (id: number, formData: any): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post(`/asset-repairs/${id}/send-to-vendor`, formData)

    revalidatePath('/maintenance')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}
