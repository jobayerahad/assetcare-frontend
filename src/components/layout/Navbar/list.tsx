import { ReactNode } from 'react'
import { AiOutlineDashboard as DashboardIcon, AiOutlineShop as VendorIcon } from 'react-icons/ai'
import { BiCabinet as AssetIcon, BiCategory as CategoryIcon, BiSolidComponent as ComponentIcon } from 'react-icons/bi'
import { MdAttachMoney as CostIcon } from 'react-icons/md'
import { GrConfigure as ConfigIcon } from 'react-icons/gr'
import { LuSettings as OperationIcon } from 'react-icons/lu'
import { TbReport as ReportIcon } from 'react-icons/tb'

type MenuItem = {
  link: string
  label: string
  icon: ReactNode
}

type MenuWithLinks = {
  label: string
  icon: ReactNode
  links: MenuItem[]
}

type MenuItems = MenuItem | MenuWithLinks

export const menuItems = [
  { link: '/', label: 'Dashboard', icon: <DashboardIcon /> },
  {
    label: 'Asset Configuration',
    icon: <ConfigIcon />,
    links: [
      { link: '/categories', label: 'Categories', icon: <CategoryIcon /> },
      { link: '/products', label: 'Products', icon: <AssetIcon /> },
      { link: '/components', label: 'Components', icon: <ComponentIcon /> },
      { link: '/vendors', label: 'Vendors', icon: <VendorIcon /> },
      { link: '/service-approvals', label: 'Service Approvals', icon: <CostIcon /> }
    ]
  },
  {
    label: 'Operations',
    icon: <OperationIcon />,
    links: [
      { link: '/receive', label: 'Receive' },
      { link: '/maintenance', label: 'Maintenance' },
      { link: '/delivery', label: 'Delivery' },
      { link: '/billing', label: 'Billing' }
    ]
  },
  {
    label: 'Reporting',
    icon: <ReportIcon />,
    links: [
      { link: '/periodic-billing-records', label: 'Periodic Billing Records' },
      { link: '/most-repaired-items', label: 'Most Repaired Items' },
      { link: '/expired-items', label: 'Expired Items' },
      { link: '/individual-repair-history', label: 'Individual Repair History' }
    ]
  }
]

export const isActiveLink = (path: string, link: string = '') => {
  if (link === '/') return path === link

  const nextChar = path[link.length]
  return path.startsWith(link) && (!nextChar || nextChar === '/')
}

export const isMenuWithLinks = (item: MenuItems): item is MenuWithLinks => (item as MenuWithLinks).links !== undefined
