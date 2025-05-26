import { ReactNode } from 'react'
import { AiOutlineDashboard as DashboardIcon, AiOutlineShop as VendorIcon } from 'react-icons/ai'
import {
  BiFoodMenu as MenuIcon,
  BiCabinet as ProductIcon,
  BiCategory as CategoryIcon,
  BiSolidComponent as ComponentIcon
} from 'react-icons/bi'
import { MdAttachMoney as CostIcon } from 'react-icons/md'
import { GrConfigure as ConfigIcon } from 'react-icons/gr'
import { GoLog as LogIcon } from 'react-icons/go'
import { LuSettings as OperationIcon } from 'react-icons/lu'
import { TbBrandBebo as BrandIcon, TbReport as ReportIcon, TbBuildingBurjAlArab as AssetIcon } from 'react-icons/tb'
import { RiAlignItemLeftLine as ItemIcon } from 'react-icons/ri'

type MenuItem = {
  link: string
  label: string
  icon?: ReactNode
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
    label: 'Configuration',
    icon: <MenuIcon />,
    links: [
      { link: '/categories', label: 'Categories', icon: <CategoryIcon /> },
      { link: '/products', label: 'Products', icon: <ProductIcon /> },
      { link: '/brands', label: 'Brands', icon: <BrandIcon /> },
      { link: '/components', label: 'Components', icon: <ComponentIcon /> },
      { link: '/vendors', label: 'Vendors', icon: <VendorIcon /> }
    ]
  },
  {
    label: 'Setup',
    icon: <ConfigIcon />,
    links: [
      { link: '/items', label: 'Items', icon: <ItemIcon /> },
      { link: '/assets', label: 'Assets', icon: <AssetIcon /> },
      { link: '/service-approvals', label: 'Approval Price', icon: <CostIcon /> }
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
  },
  { link: '/logs', label: 'Logs', icon: <LogIcon /> }
]

export const isActiveLink = (path: string, link: string = '') => {
  if (link === '/') return path === link

  const nextChar = path[link.length]
  return path.startsWith(link) && (!nextChar || nextChar === '/')
}

export const isMenuWithLinks = (item: MenuItems): item is MenuWithLinks => (item as MenuWithLinks).links !== undefined
