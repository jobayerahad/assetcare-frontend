'use server'

import { passwordBookAPI } from '@utils/api'

export const login = async (employee_id?: string, password?: string) => {
  if (process.env.NODE_ENV == 'development') {
    if (password !== process.env.DEV_PASSWORD) throw new Error('Invalid Credentials')
  } else {
    await passwordBookAPI.post('/v1/permission-check', {
      employee_id,
      password,
      application_code: 'connect_pro'
    })
  }
}
