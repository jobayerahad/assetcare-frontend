import type { Metadata } from 'next'

import ProfileUI from './ui'
import { getSessionUser } from '@utils/authorization'
import { getProfile } from '@actions/profile'

export const metadata: Metadata = {
  title: 'Profile'
}

const Profile = async () => {
  const user = await getSessionUser()
  const profile = await getProfile(user.empId)

  return <ProfileUI profile={profile} />
}

export default Profile
