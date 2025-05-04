'use server'

import api from '@utils/api'

export const getBranches = async () => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/branches')

    return data.data
  } catch (error) {
    return []
  }
}

export const getDivisions = async () => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/divisions')

    return data.data
  } catch (error) {
    return []
  }
}
