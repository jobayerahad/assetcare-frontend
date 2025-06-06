import { ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { AppShell, Burger, em } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'

import AppHeader from './Header'
import AppNavbar from './Navbar'
import LoadingComponent from '@components/common/loading'

export type Profile = {
  avatar: string
  name: string
  designation: string
  branch_name: string
  department: string
}

const StructureShell = ({ children }: { children: ReactNode }) => {
  const { status } = useSession()
  const [opened, { toggle }] = useDisclosure()
  const isSmall = useMediaQuery(`(max-width: ${em(1400)})`)

  if (status === 'loading') return <LoadingComponent />

  if (status === 'unauthenticated') return children

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: isSmall ? 250 : 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <AppHeader />
      </AppShell.Header>

      <AppShell.Navbar>
        <AppNavbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

export default StructureShell
