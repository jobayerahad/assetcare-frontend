'use client'

import { useState } from 'react'
import { signIn, SignInResponse } from 'next-auth/react'

import { Anchor, Container, Group, Image, Paper, PasswordInput, Button, Title, Text, NumberInput } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/navigation'

import { BiErrorCircle as ErrorIcon } from 'react-icons/bi'
import { CgLogIn as SignInIcon, CgPassword as PasswordIcon } from 'react-icons/cg'
import { FaRegAddressCard as EmpIdIcon } from 'react-icons/fa6'

import classes from './styles.module.css'
import { signInSchema } from '@schemas/auth.schema'
import { SignInCredentials } from '@types'

const SignInUI = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { refresh } = useRouter()

  const { onSubmit, getInputProps } = useForm<SignInCredentials>({
    validate: yupResolver(signInSchema),
    initialValues: {
      empId: undefined,
      password: ''
    }
  })

  const submitHandler = async (values: SignInCredentials) => {
    setIsLoading(true)

    const response: SignInResponse | undefined = await signIn('credentials', { ...values, redirect: false })

    if (response?.error) {
      showNotification({
        title: response ? 'Unauthorized' : 'Unexpected Error',
        message: response ? response.error : 'An unexpected error occurred. Please try again.',
        icon: <ErrorIcon />,
        color: 'red'
      })

      setIsLoading(false)
      return
    }

    refresh()
    setIsLoading(false)
  }

  return (
    <div className={classes.root}>
      <Container size="xs" className={classes.container}>
        <Paper p={28} shadow="sm" radius="md" className={classes.paper}>
          <Group justify="center" gap="xs" mb="md">
            <Image src="/sbac-logo-white.png" alt="SBAC FixLogix" h={60} w="auto" />
          </Group>

          <form onSubmit={onSubmit(submitHandler)}>
            <Title size={25} mb={4} tt="uppercase" c="gray.1">
              Sign In
            </Title>

            <Text size="sm" mb="md" c="gray.3">
              Welcome back
            </Text>

            <NumberInput
              label="Employee ID"
              placeholder="your employee ID"
              leftSection={<EmpIdIcon />}
              min={1}
              max={9999}
              maxLength={4}
              c="gray.3"
              hideControls
              withAsterisk
              {...getInputProps('empId')}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              leftSection={<PasswordIcon />}
              c="gray.3"
              withAsterisk
              mt="xs"
              {...getInputProps('password')}
            />

            <Button type="submit" leftSection={<SignInIcon />} mt="md" loading={isLoading} fullWidth>
              Sign In
            </Button>

            <Text ta="center" c="gray.5" size="xs" mt="xs">
              Note: Use{' '}
              <Anchor href="https://tools.sbacbank.com" c="inherit" size="xs" target="_blank">
                HRBook's
              </Anchor>{' '}
              password to Sign In
            </Text>
          </form>
        </Paper>
      </Container>

      <Text c="gray.2" size="xs" ta="center" className={classes.credits}>
        Designed & Developed by{' '}
        <Anchor size="xs" c="gray.1" href="https://www.sbacbank.com" target="_blank">
          SBAC Bank&apos;s IT Division
        </Anchor>
      </Text>
    </div>
  )
}

export default SignInUI
