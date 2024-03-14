import { getDonorData } from '@/actions/admin'

import RequestTable from '@/components/dashboard/RequestTable'

export default async function DonorRequests() {
  const data = await getDonorData('PENDING')

  return (
    <div>
      <RequestTable
        data={data.data}
        title='All Donor Request'
        userType='DONOR'
      />
    </div>
  )
}
