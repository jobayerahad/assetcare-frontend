'use server'

import { FilterQuery } from 'mongoose'
import { revalidatePath } from 'next/cache'

import Asset from '@models/Asset'
import { StatusMsg } from '@config/constants'
import { connectToDB } from '@utils/database'
import { paginateRes } from '@utils/helpers'
import { ActionResponse, TAsset } from '@types'

export const getAssets = async (page = 1, limit = 10, search: string) => {
  connectToDB()

  const skip = (page - 1) * limit

  const query: FilterQuery<typeof Asset> = {}

  if (search) query.$or = [{ name: { $regex: search } }]

  const [data, totalRecords] = await Promise.all([
    Asset.find(query).sort({ name: 1 }).skip(skip).limit(limit).lean(),
    Asset.countDocuments(query)
  ])

  const updatedData = data.map((datum) => ({
    ...datum,
    _id: datum._id.toString()
  }))

  return paginateRes(updatedData, totalRecords, page, limit)
}

export const getAssetMenu = async () => {
  connectToDB()

  const data = await Asset.find().select('-_id name').sort({ name: 1 })

  const list = data.map((datum) => datum.name)

  return list
}

export const addAsset = async (formData: Partial<TAsset>): Promise<ActionResponse> => {
  try {
    await Asset.create(formData)

    revalidatePath('/assets')

    return {
      status: StatusMsg.SUCCESS,
      message: 'A new asset added'
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof Error ? error.message : 'An unknown exception occured'
    }
  }
}

export const editAsset = async (id: string, formData: Partial<TAsset>): Promise<ActionResponse> => {
  try {
    await Asset.findByIdAndUpdate(id, { $set: formData })

    revalidatePath('/assets')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Asset data added'
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof Error ? error.message : 'An unknown exception occured'
    }
  }
}

export const deleteAsset = async (id: string): Promise<ActionResponse> => {
  try {
    await Asset.findByIdAndDelete(id)

    revalidatePath('/assets')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Asset data added'
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof Error ? error.message : 'An unknown exception occured'
    }
  }
}
