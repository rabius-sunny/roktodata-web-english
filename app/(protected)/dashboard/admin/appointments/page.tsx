import { getAppointments } from '@/actions/others'

import AppointmentsTable from '@/components/dashboard/AppointmentsTable'

export default async function AppointmentsForAdmin() {
  const { data } = await getAppointments()
  return (
    <div>
      <AppointmentsTable
        title='Unverified Appointments'
        isAdmin
        type='UNVERIFIED'
        data={data.filter((item: TAppointment) => item.status === 'UNVERIFIED')}
      />
      <AppointmentsTable
        title='Pending Appointments'
        isAdmin
        type='PENDING'
        data={data.filter((item: TAppointment) => item.status === 'PENDING')}
      />
      <AppointmentsTable
        title='Accepted Appointments'
        isAdmin
        type='ACCEPTED'
        data={data.filter((item: TAppointment) => item.status === 'ACCEPTED')}
      />
      <AppointmentsTable
        title='Cancelled Appointments'
        isAdmin
        type='CANCELED'
        data={data.filter((item: TAppointment) => item.status === 'CANCELED')}
      />
    </div>
  )
}
