'use server'

import { FilterQuery } from 'mongoose'
import { revalidatePath } from 'next/cache'

import RepairCost from '@models/RepairCost'
import { StatusMsg } from '@config/constants'
import { connectToDB } from '@utils/database'
import { paginateRes } from '@utils/helpers'
import { ActionResponse, TRepairCost } from '@types'

export const getRepairCosts = async (page = 1, limit = 10, search: string) => {
  connectToDB()

  const skip = (page - 1) * limit

  const query: FilterQuery<typeof RepairCost> = {}

  if (search) query.$or = [{ name: { $regex: search } }, { partName: { $regex: search } }]

  const [data, totalRecords] = await Promise.all([
    RepairCost.find(query).sort({ organization: 1 }).skip(skip).limit(limit).lean(),
    RepairCost.countDocuments(query)
  ])

  const updatedData = data.map((datum) => ({
    ...datum,
    _id: datum._id.toString()
  }))

  return paginateRes(updatedData, totalRecords, page, limit)
}

export const addRepairCost = async (formData: Partial<TRepairCost>): Promise<ActionResponse> => {
  try {
    await RepairCost.create(formData)

    revalidatePath('/repair-costs')

    return {
      status: StatusMsg.SUCCESS,
      message: 'A new repair cost added'
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof Error ? error.message : 'An unknown exception occured'
    }
  }
}
