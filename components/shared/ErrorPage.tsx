import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from 'lucide-react'

import { Button } from '../ui/button'
import Container from './Container'

export default function ErrorPage({ message }: { message?: string }) {
  const { back } = useRouter()
  return (
    <Container size='sm' className='flex-center h-[80vh]'>
      <div className='text-center'>
        <Image
          src='/images/others/bloodheart.png'
          alt='error image'
          width={300}
          height={200}
          priority
        />
        <h1 className='text-9xl font-black text-red-500 text-center'>4O4</h1>
        <div className='font-medium text-center'>
          <p className='text-primary'>
            {message || 'Error occurred, no data found.'}
          </p>
          <Button variant='link' onClick={() => back()}>
            <ArrowLeftIcon /> Try again
          </Button>
        </div>
      </div>
    </Container>
  )
}
