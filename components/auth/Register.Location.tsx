/* eslint-disable no-unused-vars */
'use client'

import { Dispatch, SetStateAction } from 'react'
import {
  locationdata,
  TBasicdata,
  TCreddata,
  TLocationdata
} from '@/constants/schema/register'
import { district } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  ArrowRight,
  Landmark,
  MapPin,
  MapPinned
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import { CInput, CSelect } from '../customs/CInput'
import { Button } from '../ui/button'

export default function RegisterLocation({
  onSubmit,
  setStep,
  data
}: {
  onSubmit: (values: TBasicdata | TLocationdata | TCreddata) => void
  setStep: Dispatch<SetStateAction<number>>
  data: any
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLocationdata>({
    resolver: zodResolver(locationdata),
    defaultValues: {
      district: data?.district,
      subDistrict: data?.subDistrict,
      state: data?.state,
      address: data?.address
    }
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <CSelect
          label='District'
          message={errors.district?.message}
          icon={{ icon: MapPin }}
          data={district.map((item) => ({ name: item, value: item }))}
          name='district'
          register={register}
          placeholder='select'
        />
        <div>
          <CInput
            label='Sub District'
            icon={{ icon: MapPin }}
            register={register}
            name='subDistrict'
            message={errors.subDistrict?.message}
          />
        </div>
        <div>
          <CInput
            label='State'
            placeholder='Kotwali state'
            icon={{ icon: Landmark }}
            register={register}
            name='state'
            message={errors.state?.message}
          />
        </div>
        <div>
          <CInput
            label='Details Address'
            placeholder='Habib nagar, College road, Rangpur'
            icon={{ icon: MapPinned }}
            register={register}
            name='address'
            message={errors.address?.message}
          />
        </div>

        <div className='flex items-center gap-4'>
          <Button
            onClick={() => setStep((prev) => prev - 1)}
            type='button'
            variant='outline'
            className='w-full mt-4 text-primary'
          >
            <ArrowLeft className='ml-2 h-4' />
            Previous
          </Button>
          <Button type='submit' className='w-full mt-4'>
            Next
            <ArrowRight className='ml-2 h-4' />
          </Button>
        </div>
      </div>
    </form>
  )
}
