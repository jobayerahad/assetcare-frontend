import { ReactNode } from 'react'
import { AiOutlineDashboard as DashboardIcon } from 'react-icons/ai'
import { BiTransfer as TransferIcon } from 'react-icons/bi'
import { BsBank as BankIcon, BsPersonVcard as RMIdIcon } from 'react-icons/bs'
import { CiBank as CBSIcon } from 'react-icons/ci'
import { FaConnectdevelop as AccessIcon } from 'react-icons/fa'
import { FiUsers as UsersIcon } from 'react-icons/fi'
import { IoPersonCircleOutline as PersonIcon } from 'react-icons/io5'
import {
  HiOutlineClipboardDocumentList as RequisitionsIcon,
  HiOutlineDocumentText as ReqisitionIcon
} from 'react-icons/hi2'
import { MdOutlineLocationOn as LocationIcon } from 'react-icons/md'
import {
  LuMonitorSmartphone as ItEquipmentIcon,
  LuUtilityPole as UtilityIcon,
  LuLocateFixed as ProblemIcon
} from 'react-icons/lu'
import { RiTeamLine as ItOfficerIcon } from 'react-icons/ri'
import { TbReport as ReportIcon } from 'react-icons/tb'
import { FaRegCreditCard as CardIcon } from 'react-icons/fa6'
import { RiDiscountPercentLine as RateIcon } from 'react-icons/ri'

import { managerRoles, performerRoles } from '@config/constants'

type MenuItem = {
  link: string
  label: string
  icon: ReactNode
}

type MenuItemWithoutIcon = {
  link: string
  label: string
}

type MenuWithLinks = {
  label: string
  icon: ReactNode
  links: MenuItemWithoutIcon[]
}

type MenuItems = MenuItem | MenuWithLinks

export const menuItems = (roles: string[]) => [
  { link: '/', label: 'Dashboard', icon: <DashboardIcon /> },
  ...(roles.some((role) => managerRoles.includes(role) || roles.includes('treasury'))
    ? [{ link: '/auth-requisitions', label: 'Auth Requistions', icon: <RequisitionsIcon /> }]
    : []),
  ...(roles.some((role) => performerRoles.includes(role))
    ? [{ link: '/perform-requisitions', label: 'Perform Requistions', icon: <RequisitionsIcon /> }]
    : []),
  ...(roles.includes('user')
    ? [
        {
          label: 'New Requisition',
          icon: <ReqisitionIcon />,
          links: [
            { link: '/cbs/user', label: 'CBS User', icon: <CBSIcon /> },
            { link: '/cbs/credentials-reset', label: 'CBS Credentials', icon: <CBSIcon /> },
            { link: '/cbs/rate-change', label: 'FDR Rate Change', icon: <RateIcon /> },
            { link: '/cbs/rm-id', label: 'RM ID', icon: <RMIdIcon /> },
            { link: '/network-access', label: 'Network Access', icon: <AccessIcon /> },
            // { link: '/it-equipment', label: 'IT Equipment', icon: <ItEquipmentIcon /> },
            { link: '/clearing', label: 'Clearing', icon: <TransferIcon /> },
            { link: '/utility', label: 'Utility', icon: <UtilityIcon /> }
          ]
        }
      ]
    : []),
  ...(roles.includes('user')
    ? [{ link: '/my-requisitions', label: 'My Requistions', icon: <RequisitionsIcon /> }]
    : []),
  { link: '/adc-disputes', label: 'ADC Disputes', icon: <CardIcon /> },
  // { link: '/general-problems', label: 'General Problems', icon: <ProblemIcon /> },
  // {
  //   label: 'Reports',
  //   icon: <ReportIcon />,
  //   links: [
  //     { link: '/reports/individual', label: 'Individual', icon: <PersonIcon /> },
  //     { link: '/reports/branch', label: 'Branch-wise', icon: <CBSIcon /> }
  //   ]
  // },
  ...(roles.includes('admin')
    ? [
        { link: '/all-requisitions', label: 'All Requistions', icon: <RequisitionsIcon /> },
        { link: '/users', label: 'User Management', icon: <UsersIcon /> }
      ]
    : [])
]

export const isActiveLink = (path: string, link: string = ''): boolean => {
  if (link === '/') return path === link

  const nextChar = path[link.length]
  return path.startsWith(link) && (!nextChar || nextChar === '/')
}

export const isMenuWithLinks = (item: MenuItems): item is MenuWithLinks => (item as MenuWithLinks).links !== undefined
