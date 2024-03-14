'use client'

import { useRouter } from 'next/navigation'
import { searchdata, TSearchdata } from '@/constants/schema/others'
import { bloodGroups, district, religions } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { GSelect } from '@/components/customs/GInput'

export default function Filterbar({ data }: { data: TSearchdata }) {
  const { push } = useRouter()
  const { bloodType, district: jillaParams, ageFrom, ageTo, religion } = data
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TSearchdata>({
    resolver: zodResolver(searchdata)
  })

  const onSubmit = (params: TSearchdata) =>
    push(
      `/search?bloodType=${params.bloodType}&district=${params.district}&religion=${params.religion}&ageFrom=${params.ageFrom}&ageTo=${params.ageTo}`
    )
  return (
    <div className='bg-secondary p-2 md:p-4 rounded-xl'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
          <div className='col-span-1'>
            <GSelect
              theme='dark'
              size='sm'
              defaultValue={bloodType}
              data={bloodGroups.map((item) => ({
                name: item,
                value: item
              }))}
              register={register}
              label='Blood Type'
              name='bloodType'
              message={errors.bloodType?.message}
            />
          </div>
          <div className='col-auto'>
            <GSelect
              theme='dark'
              size='sm'
              defaultValue={jillaParams}
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
          <div className='col-auto'>
            <GSelect
              theme='dark'
              size='sm'
              defaultValue={religion}
              data={[{ name: 'all', value: 'all' }, ...religions]}
              register={register}
              label='Religion'
              name='religion'
              message={errors.religion?.message}
            />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-2 mt-2'>
          <div className='col-auto'>
            <GSelect
              theme='dark'
              size='sm'
              defaultValue={ageFrom}
              data={[
                { name: 'all', value: 'all' },
                ...Array.from({ length: 33 }, (i, j) => j + 18).map((item) => ({
                  name: item,
                  value: item
                }))
              ]}
              register={register}
              label='Age (from)'
              name='ageFrom'
              message={errors.ageFrom?.message}
            />
          </div>
          <div className='col-auto'>
            <GSelect
              theme='dark'
              size='sm'
              defaultValue={ageTo}
              data={[
                { name: 'all', value: 'all' },
                ...Array.from({ length: 33 }, (i, j) => j + 18).map((item) => ({
                  name: item,
                  value: item
                }))
              ]}
              register={register}
              label='Age (to)'
              name='ageTo'
              message={errors.ageTo?.message}
            />
          </div>
          <div className='col-auto self-end'>
            <Button
              size='sm'
              className='w-full mb-[2px] bg-white text-primary'
              type='submit'
            >
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
