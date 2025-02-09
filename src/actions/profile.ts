'use server'

import { interbridgeAPI } from '@utils/api'
import { capWords } from '@utils/helpers'
import { Employee } from '@types'

export const getProfile = async (empId: number): Promise<Employee> => {
  const { data } = await interbridgeAPI.get(`/employees?emp_id=${empId}`)

  return {
    ...data,
    department: capWords(data.department, ['ICT'])
  }
}
