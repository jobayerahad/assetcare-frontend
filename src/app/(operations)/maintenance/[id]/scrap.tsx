import { useTransition } from 'react'
import { Button, Textarea } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { GiBroom as ScrapIcon } from 'react-icons/gi'

import { scrapAsset } from '@actions/maintenance'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'

type Props = {
  id: number
}

const ScrapAsset = ({ id }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      reason: ''
    }
  })

  const submitHandler = (values: any) =>
    startTransition(async () => {
      const res = await scrapAsset(id, values)

      showNotification(getMessage(res))
      if (res.status === StatusMsg.SUCCESS) closeAllModals()
    })

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <Textarea
        label="Scrap Reason"
        placeholder="Enter reason for scraping the asset (optional)"
        rows={4}
        {...getInputProps('reason')}
      />

      <Button type="submit" mt="md" leftSection={<ScrapIcon />} loading={isLoading}>
        Scrap
      </Button>
    </form>
  )
}

export default ScrapAsset
