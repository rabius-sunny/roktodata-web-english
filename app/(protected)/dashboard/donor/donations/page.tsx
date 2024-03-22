import { getDonations } from '@/actions/others'

import DonationCards from '@/components/dashboard/DonationCards'

export default async function Donations() {
  const { data, error } = await getDonations('DONOR')
  console.log('data', data)
  return error ? (
    <div className='my-10 text-center'>
      <h1 className='text-red-500'>Error occurred, please try again.</h1>
    </div>
  ) : data.length ? (
    <div>
      <h1 className='text-dark'>Donations</h1>
      <p className='text-litetext font-light'>My donations history</p>
      <DonationCards forDonor donations={data} />
    </div>
  ) : (
    <div className='my-10 text-center'>
      <h1 className='text-red-500'>You haven&apos;t donated yet.</h1>
    </div>
  )
}
