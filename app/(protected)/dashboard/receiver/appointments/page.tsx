import { getAppointmentForUser } from '@/actions/others'
import { auth } from '@/configs/auth'
import { CheckCheckIcon, Clock2, Clock5 } from 'lucide-react'

import { cn } from '@/lib/utils'
import DetailsApplication from '@/components/dashboard/DetailsApplication'

export default async function ReceiverApplications() {
  const session = await auth()
  const { data, error } = await getAppointmentForUser(
    session?.user.id as string
  )
  const status: TAppointmentStatus = data?.status

  return data ? (
    <div className='grid gap-4'>
      <div className='flex gap-2 sm:gap-4 items-center'>
        <div
          className={cn(
            'bg-slate-400 size-6 rounded-full',
            status === 'UNVERIFIED' && 'bg-orange-500'
          )}
        />
        <div
          className={cn(
            'flex flex-1 gap-4 px-2 py-4 bg-slate-300 opacity-50 rounded-md items-center',
            status === 'UNVERIFIED' && 'bg-orange-500 text-white opacity-100'
          )}
        >
          <Clock2 strokeWidth={1.2} className='size-7 md:size-10' />
          <p
            className={cn(
              'font-medium text-sm sm:text-base',
              status === 'UNVERIFIED' && 'text-white'
            )}
          >
            Your application is waiting for admin verification. After verifying,
            it will be send to donor.
          </p>
        </div>
      </div>
      <div className='flex gap-2 sm:gap-4 items-center'>
        <div
          className={cn(
            'bg-slate-400 size-6 rounded-full',
            status === 'PENDING' && 'bg-secondary'
          )}
        />
        <div
          className={cn(
            'flex flex-1 gap-4 px-2 py-4 bg-slate-300 opacity-50 rounded-md items-center',
            status === 'PENDING' && 'bg-secondary text-white opacity-100'
          )}
        >
          <Clock5 strokeWidth={1.2} className='size-7 md:size-10' />
          <p
            className={cn(
              'font-medium text-sm sm:text-base',
              status === 'PENDING' && 'text-white'
            )}
          >
            We have verified your application. It is waiting for donor response.
          </p>
        </div>
      </div>
      <div className='flex gap-2 sm:gap-4 items-center'>
        <div
          className={cn(
            'bg-slate-400 size-6 rounded-full',
            status === 'ACCEPTED' && 'bg-success'
          )}
        />
        <div
          className={cn(
            'flex flex-1 gap-4 px-2 py-4 bg-slate-300 opacity-50 rounded-md items-center',
            status === 'ACCEPTED' && 'bg-success text-white opacity-100'
          )}
        >
          <CheckCheckIcon strokeWidth={1.2} className='size-7 md:size-10' />
          <p
            className={cn(
              'font-medium text-sm sm:text-base',
              status === 'ACCEPTED' && 'text-white'
            )}
          >
            Your application is confirmed by donor. Please wait or contact to
            donor.
          </p>
        </div>
      </div>

      <DetailsApplication data={data} access='USER' />
    </div>
  ) : error ? (
    <h1 className='text-center mt-4 text-red-500'>
      Error occurred, try again.
    </h1>
  ) : (
    <h1 className='text-center mt-4 text-red-500'>You have no application.</h1>
  )
}
