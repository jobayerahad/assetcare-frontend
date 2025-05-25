import type { Metadata } from 'next'

import MaintenanceDetailUI from './view'
import { getMaintenance } from '@actions/maintenance'
import { getAllVendors } from '@actions/vendors'

export const metadata: Metadata = {
  title: 'Maintenance Details'
}

type Params = Promise<{ id: string }>

const MaintenanceDetails = async (props: { params: Params }) => {
  const { id } = await props.params
  const [data, vendors] = await Promise.all([getMaintenance(id), getAllVendors()])

  return <MaintenanceDetailUI data={data} vendors={vendors} />
}

export default MaintenanceDetails
