'use client'

import Link from 'next/link'
import { Container, Flex, Image, Title, Text, Button, Group, SimpleGrid } from '@mantine/core'

const NotFound = () => (
  <Container style={{ height: '80vh', display: 'flex', alignItems: 'center' }}>
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 10, sm: 'xl' }}>
      <Flex direction="column" justify="center" gap="md">
        <Title>Page not found</Title>

        <Text c="dimmed">
          Unfortunately, the page you are trying to open does not exist. You may have mistyped the address or the page
          has been moved to another URL.
        </Text>

        <Group>
          <Button component={Link} href="/" size="md" fw={400}>
            Back to Dashboard
          </Button>
        </Group>
      </Flex>

      <Image src="/404.png" alt="404" />
    </SimpleGrid>
  </Container>
)

export default NotFound
