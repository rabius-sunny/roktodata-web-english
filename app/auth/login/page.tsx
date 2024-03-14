'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { authenticate, checkStatus } from '@/actions/user'
import { logindata, TLogindata } from '@/constants/schema/register'
import { errorAlert } from '@/services/alerts/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, ShieldCheck, User2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { CInput } from '@/components/customs/CInput'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl')
  const donor = params.get('donor')
  const { data: session } = useSession()
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLogindata>({
    resolver: zodResolver(logindata)
  })
  const onSubmit = async (value: TLogindata) => {
    setLoading(true)
    try {
      const res = await checkStatus(value)
      if (res.ok) {
        await authenticate({ ...value, username: 'user' })
        return
      }
      if (res.error) errorAlert({ body: res.error })
      setLoading(false)
    } catch (error) {
      errorAlert({ body: 'Wrong email or password!' })
      setLoading(false)
    }
  }
  if (session) {
    if (callbackUrl) {
      push(callbackUrl)
      return
    } else if (donor) {
      push(`/application?donor=${donor}&receiver=${session.user.id}`)
      return
    }
    push(`/dashboard/${session.user.role.toLowerCase()}`)
  }
  return (
    <div className='auth__bg grid gap-y-4 px-3 py-8 sm:px-12 pb-4 rounded-2xl'>
      <div className='text-center mb-4'>
        <h1 className='text-3xl font-bold text-primary'>LOGIN</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <CInput
            label='Email'
            placeholder='me@rabius-sunny.com'
            icon={{ icon: User2 }}
            register={register}
            type='email'
            name='email'
            message={errors.email?.message}
          />
        </div>
        <div>
          <CInput
            label='Password'
            icon={{ icon: ShieldCheck }}
            register={register}
            name='password'
            placeholder='******'
            type='password'
            message={errors.password?.message}
          />
        </div>
        <div>
          <Button
            loading={loading}
            disabled={loading}
            type='submit'
            className='w-full mt-4'
          >
            Login
          </Button>
        </div>
        <p className='text-sm mt-4 text-light font-medium flex-center gap-2 '>
          Are you a donor?
          <Link
            className='text-secondary font-semibold flex-center'
            href='/auth/register?type=donor'
          >
            Register here
            <ArrowRight className='size-5' />
          </Link>
        </p>
        <div className='mt-4'>
          <Link
            className='text-primary font-semibold flex-center'
            href='/auth/admin'
          >
            Admin Login
            <ArrowRight className='size-5' />
          </Link>
        </div>
      </form>
    </div>
  )
}
