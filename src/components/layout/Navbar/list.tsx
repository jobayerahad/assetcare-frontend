import { ReactNode } from 'react'
import { AiOutlineDashboard as DashboardIcon, AiOutlineShop as VendorIcon } from 'react-icons/ai'
import { MdAttachMoney as CostIcon } from 'react-icons/md'

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
  // { link: '/assets', label: 'Assets', icon: <AssetIcon /> },
  { link: '/vendors', label: 'Vendors', icon: <VendorIcon /> },
  { link: '/repair-costs', label: 'Repair Costs', icon: <CostIcon /> }
]

export const isActiveLink = (path: string, link: string = '') => {
  if (link === '/') return path === link

  const nextChar = path[link.length]
  return path.startsWith(link) && (!nextChar || nextChar === '/')
}

export const isMenuWithLinks = (item: MenuItems): item is MenuWithLinks => (item as MenuWithLinks).links !== undefined
