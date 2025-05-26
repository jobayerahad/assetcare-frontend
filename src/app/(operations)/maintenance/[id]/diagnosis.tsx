import { useTransition } from 'react'
import { Button, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { FaSave as SaveIcon } from 'react-icons/fa'

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
      diagnosis_details: ''
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
        {...getInputProps('diagnosis_details')}
      />

      <Button type="submit" mt="md" loading={isLoading} leftSection={<SaveIcon />}>
        Submit
      </Button>
    </form>
  )
}

export default Diagnosis
