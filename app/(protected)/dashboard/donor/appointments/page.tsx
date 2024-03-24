import { getAppointmentsForDonor } from '@/actions/user'
import { auth } from '@/configs/auth'

import AppointmentsTable from '@/components/dashboard/AppointmentsTable'

export default async function AppointmentsForDonor() {
  const session = await auth()
  const { data } = await getAppointmentsForDonor(session?.user.id as string)
  const hasPending = data.find(
    (item: TAppointment) => item.status === 'PENDING'
  )

  return (
    <div>
      {hasPending ? (
        <AppointmentsTable
          title='Pending Appointments'
          data={data.filter((item: TAppointment) => item.status === 'PENDING')}
        />
      ) : null}
      <AppointmentsTable
        title='Accepted Appointments'
        data={data.filter((item: TAppointment) => item.status === 'ACCEPTED')}
      />
    </div>
  )
}
