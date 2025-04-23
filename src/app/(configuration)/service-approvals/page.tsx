import type { Metadata } from 'next'

import ServiceApprovalUI from './ui'
import { getAllCategory } from '@actions/categories'
import { getAllVendors } from '@actions/vendors'
import { getServiceApprovals } from '@actions/service-approvals'
import { ServiceApprovalSearchParams } from '@types'

type Props = {
  searchParams: Promise<ServiceApprovalSearchParams>
}

export const metadata: Metadata = {
  title: 'Service Approvals'
}

const ServiceApprovals = async (props: Props) => {
  const params = await props.searchParams

  const [data, categories, vendors] = await Promise.all([
    getServiceApprovals({ ...params, include: 'component, vendor, component.product, component.product.category' }),
    getAllCategory(),
    getAllVendors()
  ])

  return <ServiceApprovalUI data={data} categories={categories.data} vendors={vendors.data} />
}

export default ServiceApprovals
