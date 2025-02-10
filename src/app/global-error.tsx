'use client'

import { Button, Container } from '@mantine/core'
import { BiReset as ResetIcon } from 'react-icons/bi'

import ErrorMsg from '@components/common/error-msg'
import { AppErrorProps } from '@types'

const GlobalError = ({ error, reset }: AppErrorProps) => (
  <html>
    <body>
      <Container>
        <ErrorMsg error={error} />

        <Button variant="outline" onClick={() => reset()} leftSection={<ResetIcon size="1.05rem" />}>
          Try again
        </Button>
      </Container>
    </body>
  </html>
)

export default GlobalError
