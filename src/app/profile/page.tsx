import type { Metadata } from 'next'

import ProfileUI from './ui'
import { getSessionUser } from '@utils/authorization'

export const metadata: Metadata = {
  title: 'Profile'
}

const Profile = async () => {
  const user = await getSessionUser()

  return <ProfileUI profile={user} />
}

export default Profile
