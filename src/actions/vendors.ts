'use server'

import { FilterQuery } from 'mongoose'
import { revalidatePath } from 'next/cache'

import Vendor from '@models/Vendor'
import { StatusMsg } from '@config/constants'
import { paginateRes } from '@utils/helpers'
import { ActionResponse, TVendor } from '@types'

export const getVendors = async (page = 1, limit = 10, search: string) => {
  const skip = (page - 1) * limit

  const query: FilterQuery<typeof Vendor> = {}

  if (search) query.$or = [{ name: { $regex: search } }]

  const [data, totalRecords] = await Promise.all([
    Vendor.find(query).sort({ name: 1 }).skip(skip).limit(limit).lean(),
    Vendor.countDocuments(query)
  ])

  const updatedData = data.map((datum) => ({
    ...datum,
    _id: datum._id.toString()
  }))

  return paginateRes(updatedData, totalRecords, page, limit)
}

export const getVendorMenu = async () => {
  const data = await Vendor.find().select('-_id name').sort({ name: 1 })

  const list = data.map((datum) => datum.name)

  return list
}

export const addVendor = async (formData: Partial<TVendor>): Promise<ActionResponse> => {
  try {
    await Vendor.create(formData)

    revalidatePath('/vendors')

    return {
      status: StatusMsg.SUCCESS,
      message: 'A new vendor added'
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof Error ? error.message : 'An unknown exception occured'
    }
  }
}
