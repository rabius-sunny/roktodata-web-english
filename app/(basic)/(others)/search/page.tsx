import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSearchedDonor } from '@/actions/others'

import Container from '@/components/shared/Container'
import DonorCard from '@/components/shared/ui/DonorCard'
import Filterbar from '@/components/shared/ui/Filterbar'

export const metadata: Metadata = {
  title: 'Search Result'
}

export default async function Search({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { bloodType, district, ageFrom, ageTo, religion } = searchParams
  if (!bloodType || !district) redirect('/')

  const convertedBloodType = () => {
    if (bloodType.includes('-')) return bloodType
    return `${bloodType.trim()}+`
  }

  const data = await getSearchedDonor({
    bloodType: convertedBloodType(),
    district,
    ageFrom,
    ageTo,
    religion
  })

  return !data.length ? (
    <div className='px-4'>
      <div className='my-8'>
        <Filterbar data={{ bloodType, district, ageFrom, ageTo, religion }} />
      </div>
      <h1 className='text-primary text-2xl md:text-3xl mt-4 text-center'>
        No &quot;{convertedBloodType()}&quot; donor found in {district}
      </h1>
      <div className='text-center'>
        Try again with tweaking filters like Religion, Age etc.
      </div>
    </div>
  ) : (
    <Container className='mt-10'>
      <div className='mb-8'>
        <Filterbar data={{ bloodType, district, ageFrom, ageTo, religion }} />
      </div>
      <h1 className='text-primary text-center'>Search Results</h1>
      <hr className='mb-8' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3'>
        {data.map((donor: TDonor, idx: number) => (
          <div className='col-auto' key={idx}>
            <DonorCard donor={donor} />
          </div>
        ))}
      </div>
    </Container>
  )
}
