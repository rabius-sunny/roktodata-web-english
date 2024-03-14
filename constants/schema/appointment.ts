import * as z from 'zod'

export const appointmentSchema = z.object({
  hospitalInfo: z.string().min(10, 'field is required'),
  address: z.string().min(10, 'field is required'),
  scheduledAt: z.string().min(10, 'field is required'),
  additionalInfo: z.string().optional()
})

export type TAppointmentData = z.infer<typeof appointmentSchema>
