import { useRouter } from 'next/navigation'
import { ActionIcon, Group, Title, Tooltip } from '@mantine/core'
import { TiArrowBack as BackIcon } from 'react-icons/ti'

type Props = {
  title: string
}

const TitleBar = ({ title }: Props) => {
  const { back } = useRouter()

  return (
    <Group gap="xs">
      <Tooltip label="Back" position="bottom" withArrow>
        <ActionIcon variant="light" color="gray" onClick={back}>
          <BackIcon />
        </ActionIcon>
      </Tooltip>

      <Title order={5} ta="center">
        {title}
      </Title>
    </Group>
  )
}

export default TitleBar
