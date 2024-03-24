import Link from 'next/link'
import { getDonorProfile } from '@/actions/donor'
import { auth } from '@/configs/auth'
import dayjs from 'dayjs'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import DonationCards from '@/components/dashboard/DonationCards'
import Container from '@/components/shared/Container'
import Navigate from '@/components/shared/ui/Navigate'

export default async function DonorProfile({
  params
}: {
  params: { id: string }
}) {
  const { data } = await getDonorProfile(params.id)
  const session = await auth()
  console.log('data', data)
  return (
    <div>
      <div className='donor-card pb-32 pt-2'>
        <Navigate />
        <div className='max-w-32 md:max-w-40 mx-auto relative'>
          <div className='bg-white shadow-lg shadow-black/50 size-32 md:size-40 rounded-full flex-center text-primary font-bold text-5xl'>
            {data.bloodType}
          </div>
          <div className='absolute bottom-0 right-4 size-5 md:size-7 bg-green-500 rounded-full' />
        </div>
        <div className='text-center mt-3 tracking-wider'>
          <p className='text-light'>{data.user.email}</p>
          <p className='text-light/60 text-sm'>
            Donor from {dayjs(data.user.createdAt).format('D MMM, YYYY')}
          </p>
        </div>

        {/** 
        @TODO - place reviews link and star here like ` ★★★★★ | review -> `
        */}
      </div>
      <div className='max-w-[22rem] sm:max-w-[28rem] mx-auto'>
        <div className='-mt-20 rounded-t-xl shadow-2xl shadow-dark/20  bg-white'>
          <div className='p-4 grid gap-y-2'>
            <div className='grid grid-cols-2'>
              <div className='col-auto'>
                <p className='font-medium text-dark'>District</p>
                <p className=''>{data.user.district}</p>
              </div>
              <div className='col-auto'>
                <p className='font-medium text-dark'>Sub District</p>
                <p className=''>{data.user.subDistrict}</p>
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='col-auto'>
                <p className='font-medium text-dark'>State</p>
                <p className=''>{data.user.state}</p>
              </div>
              <div className='col-auto'>
                <p className='font-medium text-dark'>Religion</p>
                <p className=''>{data.user.religion}</p>
              </div>
            </div>
            <div>
              <p className='font-medium text-dark'>Address</p>
              <p className=''>{data.user.address}</p>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <Link
            className={cn(buttonVariants(), 'w-full')}
            href={
              session?.user
                ? `/application?donor=${params.id}&receiver=${session.user.id}`
                : `/auth/register?type=receiver&donor=${params.id}`
            }
          >
            Apply now <ArrowRight className='size-5' />
          </Link>
        </div>
      </div>

      <div className='my-12'>
        <Container size='md'>
          <h1>Previous Donations</h1> <hr className='mt-2 border-dark/20' />
          {data.donationHistory.length ? (
            <div>
              <DonationCards donations={data.donationHistory} />
            </div>
          ) : (
            <div className='text-red-600 font-medium'>
              This donor has no donations previously.
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}
