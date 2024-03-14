'use client'

import { useRouter } from 'next/navigation'

import SearchModal from '../Dialogs/SearchModal'
import Appbar from '../shared/ui/Appbar'
import { Button } from '../ui/button'

export default function HomeSlide({ image }: { image: string }) {
  const { push } = useRouter()
  return (
    <div
      className='w-full min-h-[50vh] md:min-h-[80vh] bg-no-repeat bg-cover bg-center '
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='min-h-[50vh] md:min-h-[80vh] bg-black/50 px-4 sm:px-8 lg:px-0'>
        <Appbar isHome />
        <div className='max-w-4xl pt-10 pb-10 md:pb-0 md:pt-28 mx-auto text-center md:text-start'>
          <div>
            <h1 className='text-5xl tracking-wider sm:text-7xl md:text-8xl lg:text-9xl text-light font-bold'>
              Welcome to <span className='text-red-600'>Roktodata</span>.Com
            </h1>
            <p className='text-sm md:text-lg text-light mt-4 md:mt-10'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
              ipsa sit eveniet excepturi nostrum quasi eos eaque quos, est
              libero, fuga aut id voluptatibus necessitatibus labore officiis
              recusandae quo similique.
            </p>
            <div className='my-10 md:mb-0 pb-10 flex gap-4 flex-col md:flex-row w-full'>
              <SearchModal />
              <Button
                size='lg'
                onClick={() => push('/auth/register?type=donor')}
                className='bg-white button-shadow text-primary'
              >
                Donate blood
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
