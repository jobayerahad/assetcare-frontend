import type { Metadata } from 'next'

import MaintenanceDetailUI from './view'
import { getMaintenance } from '@actions/maintenance'

export const metadata: Metadata = {
  title: 'Maintenance Details'
}

type Params = Promise<{ id: string }>

const MaintenanceDetails = async (props: { params: Params }) => {
  const { id } = await props.params
  const data = await getMaintenance(id)

  return <MaintenanceDetailUI data={data} />
}

export default MaintenanceDetails
