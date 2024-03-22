import { notFound } from '@/helper/static-response'

import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  /** @TODO add auth checking  */
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('appId') as string
  const type = searchParams.get('type') as 'declined' | 'normal'
  try {
    const appointments =
      type === 'declined'
        ? await prisma.declinedAppointment.findUnique({
            where: { id },
            include: {
              donor: {
                include: {
                  user: {
                    select: {
                      identity: true,
                      name: true,
                      district: true,
                      subDistrict: true,
                      state: true,
                      address: true,
                      phone: true,
                      phone2: true
                    }
                  }
                }
              },
              receiver: {
                select: {
                  id: true,
                  identity: true,
                  name: true,
                  district: true,
                  subDistrict: true,
                  state: true,
                  address: true,
                  phone: true,
                  phone2: true
                }
              }
            }
          })
        : await prisma.appointment.findUnique({
            where: { id },
            include: {
              donor: {
                include: {
                  user: {
                    select: {
                      identity: true,
                      name: true,
                      district: true,
                      subDistrict: true,
                      state: true,
                      address: true,
                      phone: true,
                      phone2: true
                    }
                  }
                }
              },
              receiver: {
                select: {
                  id: true,
                  identity: true,
                  name: true,
                  district: true,
                  subDistrict: true,
                  state: true,
                  address: true,
                  phone: true,
                  phone2: true
                }
              }
            }
          })
    return Response.json({ appointments }, { status: 200 })
  } catch (error) {
    return notFound(error)
  }
}
