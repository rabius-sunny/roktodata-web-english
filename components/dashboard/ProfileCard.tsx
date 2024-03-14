'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateUser } from '@/actions/user'
import { alldata, TAlldata } from '@/constants/schema/register'
import { district, genders } from '@/constants/static'
import { errorAlert, successAlert } from '@/services/alerts/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import {
  ArrowRight,
  CheckCircle,
  Facebook,
  Twitter,
  Youtube
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import { GInput, GSelect } from '../customs/GInput'
import Container from '../shared/Container'
import { Button } from '../ui/button'

type TProps = {
  onProfile?: boolean
  data: User
  isLoading: boolean
}
export default function ProfileCard({ onProfile, data, isLoading }: TProps) {
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAlldata>({
    resolver: zodResolver(alldata),
    defaultValues: {
      name: data.name,
      identity: data.identity,
      gender: data.gender,
      religion: data.religion,
      age: data.age.toString(),
      district: data.district,
      subDistrict: data.subDistrict,
      state: data.state,
      address: data.address,
      email: data.email,
      phone: data.phone,
      phone2: data.phone2,
      password: data.password
    }
  })

  const onSubmit = async (data: TAlldata) => {
    setLoading(true)
    try {
      const res = await updateUser({ ...data, age: Number(data.age) })
      res.ok && successAlert({ body: 'Info. updated successfully.' })
      res.error && errorAlert({ title: 'Error Ocurred', body: res.error })
      setLoading(false)
    } catch {
      errorAlert({ title: 'Error Ocurred', body: 'Please try again later.' })
      setLoading(false)
    }
  }

  return (
    <div className='card-shadow bg-white px-2 py-4 lg:px-4 lg:py-8'>
      <h1 className='text-dark'>Profile Info.</h1>
      <p className='text-litetext text font-light text-sm'>
        {onProfile
          ? 'You can change any info. on any field to complete editing.'
          : 'Basic info. of your account is shown here, for details and editing, hit edit below.'}
      </p>
      <hr className='my-4' />
      {onProfile ? (
        <Container size='sm'>
          <form
            className='flex flex-col gap-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='lg:grid grid-cols-5 gap-4'>
              <div className='col-span-1'>
                <h3 className='font-semibold text-secondary'>Primary Info.</h3>
              </div>
              <div className='col-span-4 max-w-lg'>
                <GInput
                  register={register}
                  label='Your Name'
                  name='name'
                  message={errors.name?.message}
                />
                <GInput
                  register={register}
                  label='Identity'
                  name='identity'
                  message={errors.identity?.message}
                />
                <GSelect
                  register={register}
                  label='Gender'
                  name='gender'
                  data={genders}
                  message={errors.gender?.message}
                />
                <GInput
                  register={register}
                  name='phone'
                  label='Phone no.'
                  message={errors.phone?.message}
                />
                <GInput
                  register={register}
                  name='phone2'
                  label='Another Phone no.'
                  message={errors.phone2?.message}
                />
              </div>
            </div>
            <hr />
            <div className='lg:grid grid-cols-5 gap-4'>
              <div className='col-span-1'>
                <h3 className='font-semibold text-secondary'>Address</h3>
              </div>
              <div className='col-span-4 max-w-lg'>
                <GSelect
                  register={register}
                  name='district'
                  label='District'
                  data={district.map((item) => ({ name: item, value: item }))}
                  message={errors.district?.message}
                />
                <GInput
                  register={register}
                  name='subDistrict'
                  label='Sub District'
                  message={errors.subDistrict?.message}
                />
                <GInput
                  register={register}
                  name='state'
                  label='State'
                  message={errors.state?.message}
                />
                <GInput
                  register={register}
                  name='address'
                  label='Details Address'
                  message={errors.address?.message}
                />
              </div>
            </div>
            <hr />
            <div className='lg:grid grid-cols-5 gap-4'>
              <div className='col-span-1'>
                <h3 className='font-semibold text-secondary'>Security Info.</h3>
              </div>
              <div className='col-span-4 max-w-lg'>
                <GInput
                  register={register}
                  name='email'
                  label='Email'
                  message={errors.email?.message}
                />
                <GInput
                  register={register}
                  name='password'
                  label='Password'
                  message={errors.password?.message}
                />
              </div>
            </div>
            <Button
              disabled={isLoading || loading}
              loading={isLoading || loading}
              type='submit'
              className='mt-4'
            >
              <CheckCircle /> Complete Edit
            </Button>
          </form>
        </Container>
      ) : (
        <div className='flex flex-col gap-3'>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>Full Name: </p>
              <p className='font-light text-litetext'>{data.name}</p>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>Phone no.: </p>
              <p className='font-light text-litetext'>{data.phone}</p>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>Email:</p>
              <p className='font-light text-litetext'>{data.email}</p>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>Address:</p>
              <p className='font-light text-litetext'>{data.address}</p>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>Social Links:</p>
              <div className='flex items-center gap-3'>
                <Facebook className='size-6 rounded-full bg-secondary text-light p-1' />
                <Twitter className='size-6 rounded-full bg-secondary text-light p-1' />
                <Youtube className='size-6 rounded-full bg-secondary text-light p-1' />
              </div>
            </div>
          </div>
          <div className='text-right'>
            <Button onClick={() => push('/dashboard/donor/profile')}>
              Edit info <ArrowRight height={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
