import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavLink, ScrollArea } from '@mantine/core'

import classes from './styles.module.css'
import { menuItems, isActiveLink, isMenuWithLinks } from './list'
import { useSession } from 'next-auth/react'

const AppNavbar = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <ScrollArea className={classes.root} p="xs">
      {menuItems(session?.user.roles || []).map((item, index) =>
        isMenuWithLinks(item) ? (
          <NavLink
            label={item.label}
            leftSection={item.icon}
            key={index}
            className={clsx(classes.link, item.links.some((url) => url.link === pathname) && classes.activeList)}
            defaultOpened={item.links.some((url) => url.link === pathname)}
          >
            {item.links.map((innerItem, innerIndex) => (
              <NavLink
                component={Link}
                href={innerItem.link}
                className={classes.link}
                label={innerItem.label}
                leftSection={innerItem.icon}
                active={isActiveLink(pathname, innerItem.link)}
                key={innerIndex}
              />
            ))}
          </NavLink>
        ) : (
          <NavLink
            component={Link}
            href={item.link!}
            className={classes.link}
            leftSection={item.icon}
            label={item.label}
            active={isActiveLink(pathname, item.link)}
            key={index}
          />
        )
      )}
    </ScrollArea>
  )
}

export default AppNavbar
