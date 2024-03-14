import { notFound } from 'next/navigation'
import { getAppointments } from '@/actions/others'

import AppointmentsTable from '@/components/dashboard/AppointmentsTable'

type TSlug = 'unverified' | 'pending' | 'accepted' | 'canceled' | 'rejected'

const getComponent = (type: TSlug, data: TAppointment[]) => {
  switch (type) {
    case 'accepted':
      return (
        <AppointmentsTable
          title='Accepted Appointments'
          isAdmin
          type='ACCEPTED'
          data={data.filter((item: TAppointment) => item.status === 'ACCEPTED')}
        />
      )

    case 'canceled':
      return (
        <AppointmentsTable
          title='Cancelled Appointments'
          isAdmin
          type='CANCELED'
          data={data.filter((item: TAppointment) => item.status === 'CANCELED')}
        />
      )

    case 'pending':
      return (
        <AppointmentsTable
          title='Pending Appointments'
          isAdmin
          type='PENDING'
          data={data.filter((item: TAppointment) => item.status === 'PENDING')}
        />
      )

    case 'unverified':
      return (
        <AppointmentsTable
          title='Unverified Appointments'
          isAdmin
          type='UNVERIFIED'
          data={data.filter(
            (item: TAppointment) => item.status === 'UNVERIFIED'
          )}
        />
      )

    case 'rejected':
      return (
        <AppointmentsTable
          title='Rejected Appointments'
          isAdmin
          type='REJECTED'
          data={data.filter((item: TAppointment) => item.status === 'REJECTED')}
        />
      )

    default:
      return (
        <AppointmentsTable
          title='Unverified Appointments'
          isAdmin
          type='UNVERIFIED'
          data={data.filter(
            (item: TAppointment) => item.status === 'UNVERIFIED'
          )}
        />
      )
  }
}

export default async function AllAppointments({
  params: { slug }
}: {
  params: { slug: TSlug }
}) {
  const { data, error } = await getAppointments()
  if (error) return notFound()
  return getComponent(slug, data)
}
