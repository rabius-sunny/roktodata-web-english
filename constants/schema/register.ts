import * as z from 'zod'

export const basicdata = z.object({
  name: z.string().min(4, 'field is required'),
  identity: z.string().min(10, 'field is required'),
  gender: z.string().min(2, 'field is required'),
  religion: z.string().min(2, 'field is required'),
  age: z.string().min(2, 'field is required')
})
export const locationdata = z.object({
  district: z.string().min(2, 'field is required'),
  subDistrict: z.string().min(2, 'field is required'),
  state: z.string().min(2, 'field is required'),
  address: z.string().min(10, 'field is required')
})
export const creddata = z.object({
  email: z.string().email('enter correct email address'),
  phone: z.string().min(11, 'field is required'),
  phone2: z.string().min(11, 'field is required'),
  password: z.string().min(6, 'password has to be minimum 6 in length')
})
export const logindata = z.object({
  email: z.string().email('enter correct email address'),
  password: z.string().min(6, 'password has to be minimum 6 in length'),
  username: z.string().optional()
})
export const alldata = z.object({
  name: z.string().min(4, 'field is required'),
  identity: z.string().min(10, 'field is required'),
  gender: z.string().min(2, 'field is required'),
  religion: z.string().min(2, 'field is required'),
  age: z.string().min(2, 'field is required'),
  district: z.string().min(2, 'field is required'),
  subDistrict: z.string().min(2, 'field is required'),
  state: z.string().min(2, 'field is required'),
  address: z.string().min(10, 'field is required'),
  email: z.string().email('enter correct email address'),
  phone: z.string().min(11, 'field is required'),
  phone2: z.string().min(11, 'field is required'),
  password: z.string().min(6, 'password has to be minimum 6 in length')
})

export type TBasicdata = z.infer<typeof basicdata>
export type TLocationdata = z.infer<typeof locationdata>
export type TCreddata = z.infer<typeof creddata>
export type TLogindata = z.infer<typeof logindata>
export type TAlldata = z.infer<typeof alldata>
