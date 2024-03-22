'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function Notfound() {
  const { replace } = useRouter()
  return (
    <div className='flex-center h-screen'>
      <div className='text-center grid gap-4'>
        <h1 className='text-primary font-black text-9xl tracking-wider'>4O4</h1>
        <p className='text-dark'>
          The page you&apos;re looking isn&apos;t created yet.
        </p>
        <div>
          <Button variant='secondary' onClick={() => replace('/')}>
            <ArrowLeft className='size-5' />
            go home
          </Button>
        </div>
      </div>
    </div>
  )
}
