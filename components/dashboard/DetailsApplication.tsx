import Image from 'next/image'
import dayjs from 'dayjs'
import { PhoneCall } from 'lucide-react'

type TProps = {
  data: any
  access: 'ADMIN' | 'USER' | 'DONOR'
}

export default function DetailsApplication({ data, access }: TProps) {
  const admin = access === 'ADMIN'
  const donor = access === 'DONOR'
  const user = access === 'USER'
  return (
    <div>
      <h1 className='my-8 text-secondary'>Application Details</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8'>
        <div className='col-auto'>
          <h2>Donor Info.</h2>
          <hr className='mb-2' />
          <div className='grid gap-2'>
            <p>
              Name :
              <span className='text-dark pl-2'>{data.donor.user.name}</span>
            </p>
            <p>
              District :
              <span className='text-dark pl-2'>{data.donor.user.district}</span>
            </p>
            <p>
              Sub District :
              <span className='text-dark pl-2'>
                {data.donor.user.subDistrict}
              </span>
            </p>
            <p>
              State :
              <span className='text-dark pl-2'>{data.donor.user.state}</span>
            </p>
            {(admin || user) && (
              <div className='flex gap-3'>
                <p>
                  Phone no. :
                  <a
                    className='flex items-center gap-2 text-primary'
                    href={`tel:+88${data.donor.user.phone}`}
                  >
                    <PhoneCall /> {data.donor.user.phone}
                  </a>
                </p>
                <p>
                  Another Phone no. :
                  <a
                    className='flex items-center gap-2 text-primary'
                    href={`tel:+88${data.donor.user.phone2}`}
                  >
                    <PhoneCall /> {data.donor.user.phone2}
                  </a>
                </p>
              </div>
            )}

            {access === 'ADMIN' && (
              <p>
                Identity :
                <span className='text-secondary pl-2 text-xl font-medium'>
                  {data.donor.user.identity}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className='col-auto'>
          <h2>Receiver Info.</h2>
          <hr className='mb-2' />
          <div className='grid gap-2'>
            <p>
              Name :<span className='text-dark pl-2'>{data.receiver.name}</span>
            </p>
            <p>
              District :
              <span className='text-dark pl-2'>{data.receiver.district}</span>
            </p>
            <p>
              Sub District :
              <span className='text-dark pl-2'>
                {data.receiver.subDistrict}
              </span>
            </p>
            <p>
              State :
              <span className='text-dark pl-2'>{data.receiver.state}</span>
            </p>
            {(admin || donor) && (
              <div className='flex gap-3'>
                <p>
                  Phone no. :
                  <a
                    className='flex items-center gap-2 text-primary'
                    href={`tel:+88${data.receiver.phone}`}
                  >
                    <PhoneCall /> {data.receiver.phone}
                  </a>
                </p>
                <p>
                  Another Phone no. :
                  <a
                    className='flex items-center gap-2 text-primary'
                    href={`tel:+88${data.receiver.phone2}`}
                  >
                    <PhoneCall /> {data.receiver.phone2}
                  </a>
                </p>
              </div>
            )}
            {access === 'ADMIN' && (
              <p>
                Identity :
                <span className='text-secondary pl-2 text-xl font-medium'>
                  {data.receiver.identity}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <h2>Application Info.</h2>
      </div>
      <hr />
      <div className='mt-6'>
        <h3 className='font-medium'>
          Application Time :
          <span className='text-secondary pl-4'>
            {dayjs(data.scheduledAt).format('D MMM, YY  ~  h : mm A')}
          </span>
        </h3>
        <h3 className='font-medium mt-2'>Hospital Address</h3>
        <p>{data.address}</p>
        <h3 className='font-medium mt-2'>Others Info. About Hospital</h3>
        <p>{data.hospitalInfo}</p>
        <h3 className='font-medium mt-2'>Others Info.</h3>
        <p>{data.additionalInfo}</p>
      </div>
      <div className='mt-6'>
        <h2>Attached Files</h2>
        <hr />
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-3'>
          {data.images.map((item: string, idx: number) => (
            <div className='col-auto' key={idx}>
              <Image
                width={400}
                height={300}
                src={`https://utfs.io/f/${item}`}
                alt='file image'
                className='w-full'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
