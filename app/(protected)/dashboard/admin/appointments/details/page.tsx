'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { updateAppointmentStatus } from '@/actions/admin'
import { confirmAlertAsync } from '@/services/alerts/alerts'
import requests from '@/services/network/http'

import useAsync from '@/lib/useAsync'
import { Button } from '@/components/ui/button'
import DetailsApplication from '@/components/dashboard/DetailsApplication'

export default function AppointmentsDetails() {
  const { back } = useRouter()
  const searchParams = useSearchParams()
  const appId = searchParams.get('id') as string
  const appType = searchParams.get('type') as TAppointmentStatus
  const { data, isLoading, error } = useAsync(
    `/api/admin/get-appointment?appId=${appId}`,
    requests.get
  )
  const handleAction = async (status: TAppointmentStatus) => {
    const res = await updateAppointmentStatus(appId, status)
    if (res.ok) {
      back()
      return { ok: true }
    }
    if (res.error) return { error: 'Try again' }
  }
  if (isLoading) return <div>Loading...</div>
  if (error)
    return (
      <div className='text-red-500 font-medium text-3xl text-center'>
        Error occurred, try again.
      </div>
    )
  return (
    <div>
      <DetailsApplication data={data.appointment} access='ADMIN' />
      <div className='mt-12'>
        {appType === 'UNVERIFIED' && (
          <div className='flex flex-col md:flex-row-reverse gap-8'>
            <Button
              onClick={() =>
                confirmAlertAsync({
                  body: 'Verify the application ?',
                  precom: () => handleAction('PENDING'),
                  successText:
                    'Successfully verified the application and donor is notified.'
                })
              }
              shadow
              className='w-full'
              size='lg'
              variant='secondary'
            >
              Verify
            </Button>
            <Button
              onClick={() =>
                confirmAlertAsync({
                  body: 'Reject the application ?',
                  precom: () => handleAction('REJECTED'),
                  successText: 'Application got rejected.'
                })
              }
              shadow
              className='w-full'
              size='lg'
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
