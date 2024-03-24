'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { acceptAppointment } from '@/actions/donor'
import { confirmAlertAsync } from '@/services/alerts/alerts'
import requests from '@/services/network/http'

import useAsync from '@/lib/useAsync'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import DetailsApplication from '@/components/dashboard/DetailsApplication'
import CancelDialog from '@/components/Dialogs/CancelDialog'
import CompleteDialog from '@/components/Dialogs/CompleteDialog'

export default function AppointmentsDetailsForDonor() {
  const searchParams = useSearchParams()
  const [openCancelDialog, setOpenCancelDialog] = useState(false)
  const [openCompleteDialog, setOpenCompleteDialog] = useState(false)
  const appId = searchParams.get('id') as string
  const { back } = useRouter()
  const { data, isLoading, error } = useAsync(
    `/api/admin/get-appointment?appId=${appId}`,
    requests.get
  )

  const handleAccept = async () => {
    try {
      const res = await acceptAppointment(appId)
      if (res.ok) {
        back()
        return { ok: true }
      }
      if (res.error) return { error: 'Try again' }
    } catch {
      return { error: 'Try again' }
    }
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
      <DetailsApplication data={data.appointment} access='DONOR' />

      <CancelDialog
        appId={appId}
        open={openCancelDialog}
        setOpen={setOpenCancelDialog}
      />
      <CompleteDialog
        appId={appId}
        open={openCompleteDialog}
        setOpen={setOpenCompleteDialog}
      />

      {/* Pending Actions */}
      <div
        className={cn(
          'mt-12 flex flex-col md:flex-row-reverse gap-4',
          data.appointment.status === 'PENDING' ? 'flex' : 'hidden'
        )}
      >
        <Button
          onClick={() =>
            confirmAlertAsync({
              body: 'Accept the application?',
              precom: handleAccept,
              successText:
                'Application has been accepted. Please make your donation at the right place in the right time. Thank you.'
            })
          }
          shadow
          className='w-full'
          size='lg'
          variant='secondary'
        >
          Accept
        </Button>
        <Button
          onClick={() => setOpenCancelDialog(true)}
          shadow
          className='w-full'
          size='lg'
        >
          Reject
        </Button>
      </div>

      {/* Complete Actions */}
      <div
        className={cn(
          'mt-12',
          data.appointment.status === 'ACCEPTED' ? 'block' : 'hidden'
        )}
      >
        <Button
          onClick={() => setOpenCompleteDialog(true)}
          className='bg-success w-full'
        >
          Donation completed
        </Button>
      </div>
    </div>
  )
}
