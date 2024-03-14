import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function AuthBtn() {
  const { data } = useSession()
  const { push } = useRouter()

  return data ? (
    <Button
      shadow
      onClick={() => push(`/dashboard/${data.user.role.toLowerCase()}`)}
      variant='primarysubtle'
      className='mt-8'
    >
      Profile <ArrowRight className='h-5' />
    </Button>
  ) : (
    <div className='mt-10 grid gap-y-4'>
      <Button
        size='lg'
        className='shadow-md'
        onClick={() => push('/auth/login')}
      >
        LOGIN
      </Button>
      <Button
        size='lg'
        className='shadow-md uppercase'
        onClick={() => push('/auth/register?type=donor')}
        variant='secondarysubtle'
      >
        Register Donor
      </Button>
    </div>
  )
}
