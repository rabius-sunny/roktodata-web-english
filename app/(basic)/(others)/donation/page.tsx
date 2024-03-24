import Image from 'next/image'
import { getSingleDonation } from '@/actions/others'
import dayjs from 'dayjs'

import Container from '@/components/shared/Container'

export default async function DonationDetails({
  searchParams
}: {
  searchParams: { [key: string]: string }
}) {
  const { data } = await getSingleDonation(searchParams.id)

  return (
    <div className='my-10'>
      <h1 className='mb-12 text-secondary text-center'>Donation details</h1>
      <Container size='sm'>
        <div className='flex justify-center mb-8'>
          <div className='text-white shadow-lg shadow-black/40 size-32 md:size-40 rounded-full flex-center bg-primary font-bold text-5xl'>
            {data.receiver.bloodType}
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8'>
          <div className='col-auto'>
            <h2>Donor info.</h2>
            <hr className='mb-2' />
            <div className='grid gap-2'>
              <p>
                District :
                <span className='text-dark pl-2'>
                  {data.donor.user.district}
                </span>
              </p>
              <p>
                Sub district :
                <span className='text-dark pl-2'>
                  {data.donor.user.subDistrict}
                </span>
              </p>
              <p>
                State :
                <span className='text-dark pl-2'>{data.donor.user.state}</span>
              </p>
            </div>
          </div>
          <div className='col-auto'>
            <h2>Receiver info.</h2>
            <hr className='mb-2' />
            <div className='grid gap-2'>
              <p>
                District :
                <span className='text-dark pl-2'>{data.receiver.district}</span>
              </p>
              <p>
                Sub district :
                <span className='text-dark pl-2'>
                  {data.receiver.subDistrict}
                </span>
              </p>
              <p>
                State :
                <span className='text-dark pl-2'>{data.receiver.state}</span>
              </p>
            </div>
          </div>
        </div>

        <div className='mt-6'>
          <h2>Appointment info.</h2>
        </div>
        <hr />
        <div className='mt-6'>
          <h3 className='font-medium'>
            Appointment time :
            <span className='text-secondary pl-4'>
              {dayjs(data.scheduledAt).format('D MMM, YY  ~@~  h : mm A')}
            </span>
          </h3>
        </div>
        {data.image && (
          <div className='mt-6'>
            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-3'>
              <div className='col-auto'>
                <Image
                  width={400}
                  height={300}
                  src={`https://utfs.io/f/${data.image}`}
                  alt='file image'
                  className='w-full'
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
