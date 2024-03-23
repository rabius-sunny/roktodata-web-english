'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  declineAppointment,
  deleteDeclinedAppointment,
  updateAppointmentStatus
} from '@/actions/admin'
import { confirmAlertAsync } from '@/services/alerts/alerts'
import requests from '@/services/network/http'

import useAsync from '@/lib/useAsync'
import { Button } from '@/components/ui/button'
import DetailsApplication from '@/components/dashboard/DetailsApplication'

type TAppointmentType = 'declined' | 'normal'

export default function AppointmentsDetails() {
  const { back } = useRouter()
  const searchParams = useSearchParams()
  const appId = searchParams.get('id') as string
  const type = searchParams.get('type') as TAppointmentType

  const { data, isLoading, error } = useAsync(
    `/api/admin/get-appointment?appId=${appId}&type=${type}`,
    requests.get
  )

  const handleVerifyOrReject = async (status: TAppointmentStatus) => {
    const res =
      status === 'REJECTED'
        ? await declineAppointment(appId, 'REJECTED')
        : await updateAppointmentStatus(appId, status)
    if (res.ok) {
      back()
      return { ok: true }
    }
    if (res.error) return { error: 'try again.' }
  }

  const handleDeleteDeclined = async () => {
    const res = await deleteDeclinedAppointment(appId)
    if (res.ok) {
      back()
      return { ok: true }
    }
    if (res.error) return { error: 'try again.' }
  }

  if (isLoading)
    return <div className='text-center text-xl font-medium'>Loading...</div>
  if (error || !data)
    return (
      <div className='text-red-500 font-medium text-3xl text-center'>
        Error occurred, try again.।
      </div>
    )

  return (
    <div>
      <DetailsApplication data={data.appointments} access='ADMIN' />
      <div className='mt-12'>
        {data.appointments.status === 'UNVERIFIED' && (
          <div className='flex flex-col md:flex-row-reverse gap-8'>
            <Button
              onClick={() =>
                confirmAlertAsync({
                  body: 'Verify the application?',
                  precom: () => handleVerifyOrReject('PENDING'),
                  successText:
                    'Application has been verified and donor has been notified.'
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
                  body: 'Reject the application?',
                  precom: () => handleVerifyOrReject('REJECTED'),
                  successText: 'Application has been rejected.'
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

        {data.appointments.status === 'REJECTED' && (
          <Button
            onClick={() =>
              confirmAlertAsync({
                body: 'Delete the application?',
                precom: handleDeleteDeclined,
                successText: 'Application data has been removed from database.'
              })
            }
            shadow
            className='w-full'
            size='lg'
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  )
}
