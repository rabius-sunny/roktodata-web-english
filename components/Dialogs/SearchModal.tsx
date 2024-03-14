'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { searchdata, TSearchdata } from '@/constants/schema/others'
import { bloodGroups, district, religions } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader
} from '@/components/ui/alert-dialog'

import { GSelect } from '../customs/GInput'
import { Button } from '../ui/button'

type TProps = {
  trigger?: string
}
export default function SearchModal({ trigger }: TProps) {
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TSearchdata>({
    resolver: zodResolver(searchdata)
  })

  const onSubmit = (data: TSearchdata) => {
    push(
      `/search?bloodType=${data.bloodType}&district=${data.district}&religion=${data.religion}&ageFrom=${data.ageFrom}&ageTo=${data.ageTo}`
    )
    setTimeout(() => setIsOpen(false), 1000)
  }

  return (
    <AlertDialog open={isOpen}>
      <Button
        size='lg'
        onClick={() => setIsOpen(true)}
        className='button-shadow'
      >
        {trigger || 'Get blood'}
      </Button>
      <AlertDialogContent className='rounded-lg'>
        <AlertDialogHeader builtin>Find Nearest Donor</AlertDialogHeader>
        <AlertDialogDescription className='text-center sm:text-start'>
          Find donor by selecting District and Blood Group
        </AlertDialogDescription>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              <div className='col-span-1'>
                <GSelect
                  data={bloodGroups.map((item) => ({
                    name: item,
                    value: item
                  }))}
                  register={register}
                  label='Blood Group'
                  name='bloodType'
                  message={errors.bloodType?.message}
                />
              </div>
              <div className='col-auto'>
                <GSelect
                  data={district.map((item) => ({
                    name: item,
                    value: item
                  }))}
                  register={register}
                  label='District'
                  name='district'
                  message={errors.district?.message}
                />
              </div>
            </div>

            <div className='grid grid-cols-3 gap-2 mt-2'>
              <div className='col-span-3 md:col-auto'>
                <GSelect
                  defaultValue='all'
                  data={[{ name: 'all', value: 'all' }, ...religions]}
                  register={register}
                  label='Religion'
                  name='religion'
                  message={errors.religion?.message}
                />
              </div>
              <div className='col-auto'>
                <GSelect
                  defaultValue='all'
                  data={[
                    { name: 'all', value: 'all' },
                    ...Array.from({ length: 33 }, (i, j) => j + 18).map(
                      (item) => ({
                        name: item,
                        value: item
                      })
                    )
                  ]}
                  register={register}
                  label='Age (from)'
                  name='ageFrom'
                  message={errors.ageFrom?.message}
                />
              </div>
              <div className='col-auto'>
                <GSelect
                  defaultValue='all'
                  data={[
                    { name: 'all', value: 'all' },
                    ...Array.from({ length: 33 }, (i, j) => j + 18).map(
                      (item) => ({
                        name: item,
                        value: item
                      })
                    )
                  ]}
                  register={register}
                  label='Age (to)'
                  name='ageTo'
                  message={errors.ageTo?.message}
                />
              </div>
            </div>

            <div className='flex flex-col-reverse sm:flex-row items-center justify-end gap-2 mt-8'>
              <Button
                onClick={() => setIsOpen(false)}
                className='text-primary w-full'
                variant='outline'
              >
                Cancel
              </Button>
              <Button className='w-full' type='submit'>
                Search
              </Button>
            </div>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
