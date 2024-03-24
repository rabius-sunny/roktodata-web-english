'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/configs/auth'
import { TSearchdata } from '@/constants/schema/others'
import removeProperties from '@/helper/removeProperties'
import { error_res, success_res } from '@/helper/static-response'
import { UTApi } from 'uploadthing/server'

import prisma from '@/lib/prisma'

const utapi = new UTApi()

export const getSearchedDonor = async (data: TSearchdata) => {
  const { bloodType, district, religion, ageFrom, ageTo } =
    removeProperties(data)

  try {
    const data = await prisma.donorProfile.findMany({
      where: {
        status: 'ACTIVE',
        bloodType,
        user: {
          district,
          religion,
          age: {
            gte: Number(ageFrom ?? 18),
            lte: Number(ageTo ?? 50)
          }
        }
      },
      include: {
        user: {
          select: {
            district: true,
            subDistrict: true,
            address: true,
            state: true,
            bloodType: true,
            name: true,
            email: true
          }
        }
      }
    })
    return data as any
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

export const uploadFiles = async (formData: FormData) => {
  const files = formData.getAll('files')
  try {
    const res = await utapi.uploadFiles(files)
    return success_res(res.map((item) => item.data?.key))
  } catch (error) {
    console.log('error on uploading ', error)
    throw new Error('something went wrong')
  }
}

export const checkAppointmentAvailablity = async (
  donor: string,
  receiver: string
) => {
  try {
    const donorRes = await prisma.donorProfile.findUnique({
      where: { id: donor }
    })
    const userRes = await prisma.receiver.findUnique({
      where: { id: receiver }
    })
    const hasReceiverAppointment = await prisma.appointment.findUnique({
      where: { receiverId: receiver }
    })
    if (!donorRes || !userRes) return error_res('No donor or receiver found.')
    if (hasReceiverAppointment) {
      return error_res(
        `You've already submitted an application. You can make a new after completing the previous.`
      )
    }
    return success_res()
  } catch {
    return error_res()
  }
}

export const createAppointment = async (data: any) => {
  const { donor, receiver, ...rest } = data
  try {
    await prisma.appointment.create({
      data: {
        donor: { connect: { id: donor } },
        receiver: { connect: { id: receiver } },
        ...rest
      }
    })
    await prisma.receiver.update({
      where: {
        id: receiver
      },
      data: {
        userStatus: 'REQUESTED'
      }
    })

    revalidatePath('/dashboard/admin', 'layout')

    return success_res()
  } catch {
    return error_res()
  }
}

export const getAppointments = async () => {
  try {
    const applications = await prisma.appointment.findMany({
      include: {
        donor: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        },
        receiver: {
          select: {
            name: true
          }
        }
      }
    })
    return success_res(applications)
  } catch {
    return error_res()
  }
}

export const getDeclinedAppointments = async () => {
  try {
    const appointments = await prisma.declinedAppointment.findMany({
      include: {
        donor: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        },
        receiver: {
          select: {
            name: true
          }
        }
      }
    })
    return success_res(appointments)
  } catch {
    return error_res()
  }
}

export const getAppointmentForUser = async (id: string) => {
  try {
    const applications = await prisma.appointment.findUnique({
      where: { receiverId: id },
      include: {
        donor: {
          include: {
            user: {
              select: {
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
            name: true,
            district: true,
            subDistrict: true,
            state: true,
            address: true
          }
        }
      }
    })
    return success_res(applications)
  } catch {
    return error_res()
  }
}

export const getUserStatus = async (id: string) => {
  try {
    const user = await prisma.receiver.findUnique({ where: { id } })
    if (!user) return error_res('No user found.')
    return success_res({
      profileStatus: user?.status,
      requestStatus: user?.userStatus
    })
  } catch {
    return error_res()
  }
}

export const getDonations = async (type: TUserType) => {
  const session = await auth()
  if (!session) return error_res('Unauthenticated')

  const id = session.user.id

  try {
    const data =
      type === 'DONOR'
        ? await prisma.donation.findMany({
            where: {
              donor: {
                userId: id
              }
            },
            include: {
              receiver: {
                select: {
                  name: true,
                  religion: true,
                  bloodType: true,
                  district: true,
                  subDistrict: true,
                  state: true,
                  address: true,
                  phone: true,
                  phone2: true
                }
              },
              donor: {
                include: {
                  user: {
                    select: {
                      name: true,
                      religion: true,
                      bloodType: true,
                      district: true,
                      subDistrict: true,
                      state: true,
                      address: true,
                      phone: true,
                      phone2: true
                    }
                  }
                }
              }
            }
          })
        : await prisma.donation.findMany({
            where: { receiverId: id },
            include: {
              receiver: {
                select: {
                  name: true,
                  religion: true,
                  bloodType: true,
                  district: true,
                  subDistrict: true,
                  state: true,
                  address: true,
                  phone: true,
                  phone2: true
                }
              },
              donor: {
                include: {
                  user: {
                    select: {
                      name: true,
                      religion: true,
                      bloodType: true,
                      district: true,
                      subDistrict: true,
                      state: true,
                      address: true,
                      phone: true,
                      phone2: true
                    }
                  }
                }
              }
            }
          })
    return success_res(data)
  } catch {
    return error_res()
  }
}
