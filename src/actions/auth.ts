'use server'

import api from '@utils/api'

export const login = async (emp_id: string, password: string) => {
  const apiObj = await api()
  const { data } = await apiObj.post('/login', { emp_id, password })

  return {
    access_token: data?.access_token,
    ...data?.user
  }
}
