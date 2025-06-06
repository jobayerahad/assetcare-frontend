import clsx from 'clsx'
import type { Metadata } from 'next'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { Work_Sans, Lora, Fira_Code } from 'next/font/google'

import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import './globals.css'
import { theme } from '@config/theme'
import AuthLayout from '@components/layout/main'
import { WrapperProps } from '@types'

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

const fira_code = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://assetcare.sbacbank.com'),
  title: {
    default: 'AssetCare',
    template: '%s - AssetCare'
  },
  description: 'AssetCare implies a smart, streamlined, and logical system for managing repair tracking and reporting',
  authors: [{ name: 'Jobayer Al Mahmud Ahad', url: 'https://www.jobayerahad.com' }],
  publisher: 'SBAC Bank PLC'
}

const RootLayout = ({ children }: WrapperProps) => (
  <html lang="en" className={clsx(work_sans.variable, lora.variable, fira_code.variable)} suppressHydrationWarning>
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
