'use client'

import { useSession } from 'next-auth/react'
import { Container, SimpleGrid, Text, Title } from '@mantine/core'

const DashboardUI = () => {
  const { status, data: session } = useSession()

  return (
    <Container>
      {status === 'authenticated' && (
        <Title order={2} mb="xs">
          Hi, {session.user.name}.
        </Title>
      )}

      <Text c="dimmed" size="sm">
        An overview SBAC Bank PLC.&apos;s AssetFlow app
      </Text>

      <SimpleGrid cols={{ base: 1, md: 2 }}></SimpleGrid>
    </Container>
  )
}

export default DashboardUI
