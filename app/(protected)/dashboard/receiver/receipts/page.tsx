import { getDonations } from '@/actions/others'

import DonationCards from '@/components/dashboard/DonationCards'

export default async function DonationsForReceiver() {
  const { data, error } = await getDonations('RECEIVER')

  return error ? (
    <div className='my-10 text-center'>
      <h1 className='text-red-500'>Error occurred, please try again.</h1>
    </div>
  ) : data.length ? (
    <div>
      <h1 className='text-dark'>Blood Receipt</h1>
      <p className='text-litetext font-light'>My receiving history</p>
      <DonationCards donations={data} />
    </div>
  ) : (
    <div className='my-10 text-center'>
      <h1 className='text-red-500'>You haven&apos;t received any blood yet</h1>
    </div>
  )
}
