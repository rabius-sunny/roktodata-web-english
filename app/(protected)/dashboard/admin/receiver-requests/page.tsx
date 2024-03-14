import { getReceiverData } from '@/actions/admin'

import RequestTable from '@/components/dashboard/RequestTable'

export default async function ReceiverRequests() {
  const data = await getReceiverData('PENDING')

  return (
    <div>
      <RequestTable
        data={data.data}
        userType='RECEIVER'
        title='All Receiver Requests'
      />
    </div>
  )
}
