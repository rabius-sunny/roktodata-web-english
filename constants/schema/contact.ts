import * as z from 'zod'

export const contactdata = z.object({
  name: z.string().min(4, 'field is required'),
  email: z.string().email('enter correct email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'field is required')
})

export type TContactData = z.infer<typeof contactdata>
