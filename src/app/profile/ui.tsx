'use client'

import { Avatar, Container, Grid, Group, Paper, Table, Title } from '@mantine/core'
import { AiOutlineUser as ProfileIcon } from 'react-icons/ai'

import { capWords } from '@utils/helpers'
import { Employee } from '@types'

type Props = {
  profile: Employee
}

const ProfileUI = ({ profile }: Props) => (
  <Container>
    <Title order={3} mb="xs">
      <Group gap="xs">
        <ProfileIcon /> Profile
      </Group>
    </Title>

    <Paper component={Grid} shadow="xs" p="sm">
      <Grid.Col span={8}>
        <Table striped withTableBorder withColumnBorders>
          <Table.Tbody>
            {[
              { title: 'Name', value: profile.name },
              { title: 'Employee ID', value: profile.empId },
              { title: 'Designation', value: profile.designation },
              { title: 'Branch', value: `${profile.branch?.name} (${profile.branch?.code})` },
              { title: profile.branch?.code === '0001' ? 'Division' : 'Department', value: profile.department },
              { title: 'Email', value: profile.email },
              { title: 'Cell Number', value: profile.cellNo },
              { title: 'Role', value: capWords(profile.role) }
            ].map(({ title, value }, index) => (
              <Table.Tr key={index}>
                <Table.Th>{title}</Table.Th>
                <Table.Td>{value}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Grid.Col>

      <Grid.Col span={4}>
        <Avatar src={profile.avatar} alt={profile.name} w="100%" h="auto" radius="md" />
      </Grid.Col>
    </Paper>
  </Container>
)

export default ProfileUI
