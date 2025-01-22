import clsx from 'clsx'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { Work_Sans, Lora } from 'next/font/google'

import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import './globals.css'
import { theme } from '@config/theme'
import AuthLayout from '@components/layout/main'

const work_sans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap'
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fixlogix.sbacbank.com'),
  title: {
    default: 'FixLogix',
    template: '%s - FixLogix'
  },
  description: 'FixLogix implies a smart, streamlined, and logical system for managing repair tracking and reporting',
  authors: [{ name: 'Jobayer Al Mahmud Ahad', url: 'https://www.jobayerahad.com' }],
  publisher: 'SBAC Bank PLC'
}

type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => (
  <html lang="en" className={clsx(work_sans.variable, lora.variable)} suppressHydrationWarning>
    <head>
      <ColorSchemeScript defaultColorScheme="auto" />
    </head>

    <body>
      <MantineProvider theme={theme} defaultColorScheme="auto" classNamesPrefix="sbac">
        <Notifications />

        <AuthLayout>{children}</AuthLayout>
      </MantineProvider>
    </body>
  </html>
)

export default RootLayout
