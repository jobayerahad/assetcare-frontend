import { useState } from 'react'
import { Button, Textarea } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { SiScrapy as ScrapIcon } from 'react-icons/si'
import { closeAllModals } from '@mantine/modals'

import { scrapAsset } from '@actions/maintenance'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'

type Props = {
  id: number
}

const ScrapAsset = ({ id }: Props) => {
  const [reason, setReason] = useState('')

  const submitHandler = async () => {
    const res = await scrapAsset(id, reason)
    showNotification(getMessage(res))
    if (res.status === StatusMsg.SUCCESS) closeAllModals()
  }

  return (
    <form>
      <Textarea
        label="Scrap Reason"
        placeholder="Enter reason for scraping the asset (optional)"
        value={reason}
        mb="sm"
        rows={4}
        onChange={(e) => setReason(e.currentTarget.value)}
      />

      <Button leftSection={<ScrapIcon />} onClick={submitHandler}>
        Scrap
      </Button>
    </form>
  )
}

export default ScrapAsset
