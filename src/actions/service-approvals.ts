'use server'

import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'

import api from '@utils/api'
import { StatusMsg } from '@config/constants'
import { handleError } from '@utils/helpers'
import { TServiceApprovalForm, ActionResponse, SearchParams } from '@types'

export const getServiceApprovals = async (params: SearchParams) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/service-approvals', { params })

    return data
  } catch (error) {
    notFound()
  }
}

export const addServiceApproval = async (formData: Partial<TServiceApprovalForm>): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post('/service-approvals', formData)

    revalidatePath('/service-approvals')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}

export const updateServiceApproval = async (
  id: number,
  formData: Partial<TServiceApprovalForm>
): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.put(`/service-approvals/${id}`, formData)

    revalidatePath('/service-approvals')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return handleError(error)
  }
}

export const deleteServiceApproval = async (id: number): Promise<ActionResponse> => {
  try {
    const apiObj = await api()
    await apiObj.delete(`/service-approvals/${id}`)

    revalidatePath('/service-approvals')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Service Approval deleted successfully'
    }
  } catch (error) {
    return handleError(error)
  }
}
