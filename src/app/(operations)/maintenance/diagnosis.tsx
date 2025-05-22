import { useTransition } from 'react'
import { Button, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'

import { diagnosisAsset } from '@actions/maintenance'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'

type Props = {
  id: number
}

const Diagnosis = ({ id }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      diagnosis: ''
    }
  })

  const submitHandler = (values: any) =>
    startTransition(async () => {
      const res = await diagnosisAsset(id, values)

      showNotification(getMessage(res))
      if (res.status === StatusMsg.SUCCESS) closeAllModals()
    })

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <Textarea
        label="Dignosis Report"
        placeholder="Write diagnosis report (optional)"
        rows={4}
        {...getInputProps('diagnosis')}
      />

      <Button type="submit" mt="md" loading={isLoading} fullWidth>
        Save
      </Button>
    </form>
  )
}

export default Diagnosis
