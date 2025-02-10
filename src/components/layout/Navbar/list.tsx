import { ReactNode } from 'react'
import { AiOutlineDashboard as DashboardIcon } from 'react-icons/ai'

type MenuItem = {
  link: string
  label: string
  icon: ReactNode
}

type MenuWithLinks = {
  label: string
  icon: ReactNode
  links: {
    link: string
    label: string
    icon: ReactNode
  }[]
}

type MenuItems = MenuItem | MenuWithLinks

export const menuItems = [{ link: '/', label: 'Dashboard', icon: <DashboardIcon /> }]

export const isActiveLink = (path: string, link: string = ''): boolean => {
  if (link === '/') return path === link

  const nextChar = path[link.length]
  return path.startsWith(link) && (!nextChar || nextChar === '/')
}

export const isMenuWithLinks = (item: MenuItems): item is MenuWithLinks => (item as MenuWithLinks).links !== undefined
