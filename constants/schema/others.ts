import * as z from 'zod'

export const searchdata = z.object({
  bloodType: z.string().min(1, 'field is required'),
  district: z.string().min(2, 'field is required'),
  religion: z.string().optional(),
  ageFrom: z.string().optional(),
  ageTo: z.string().optional()
})

export type TSearchdata = z.infer<typeof searchdata>
