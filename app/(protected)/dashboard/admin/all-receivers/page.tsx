import { getReceiverData } from '@/actions/admin'

import UserTable from '@/components/dashboard/UserTable'

export default async function AllReceivers() {
  const data = await getReceiverData('ACCEPTED')

  return (
    <div>
      <UserTable data={data.data} userType='RECEIVER' title='All Recievers' />
    </div>
  )
}
