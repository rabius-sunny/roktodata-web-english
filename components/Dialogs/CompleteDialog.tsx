/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createDonation } from '@/actions/donor'
import { errorAlert, successAlert } from '@/services/alerts/alerts'
import requests from '@/services/network/http'

import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader
} from '@/components/ui/alert-dialog'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type TPorps = {
  open: boolean
  setOpen: Function
  appId: string
}

export default function CompleteDialog({ open, setOpen, appId }: TPorps) {
  const { back } = useRouter()

  const [image, setImage] = useState<string | ArrayBuffer | null>(null)
  const [fileImage, setFileImage] = useState<File | any>(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (file?: File) => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  const handleAction = async () => {
    setLoading(true)
    try {
      if (image) {
        const file = new FormData()
        file.append('files', fileImage)
        const res = await requests.post('/api/uploadthing/upload', file)
        if (res.ok && res.data && res.data[0]) {
          const donation = await createDonation(appId, res.data[0])
          if (donation.ok) {
            successAlert({ title: 'Succeed' })
            return back()
          }
        }
      }

      const donation = await createDonation(appId)
      if (donation.ok) {
        successAlert({ title: 'Succeed' })
        return back()
      }

      setLoading(false)
      return errorAlert({ body: 'Error occurred, try again.' })
    } catch {
      setLoading(false)
      return errorAlert({ body: 'Error occurred, try again.' })
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader builtin>Attach a photo</AlertDialogHeader>
        <AlertDialogDescription>
          This donation will be posted into Donation History along with other
          places. You can attach a success photo or{' '}
          <span className='text-secondary font-semibold px-1'>Submit</span>{' '}
          directly.
        </AlertDialogDescription>
        <div>
          <Label htmlFor='image'>Select Image</Label>
          <Input
            disabled={loading}
            onChange={(e) => {
              setFileImage(e.target.files?.[0])
              handleImageChange(e.target.files?.[0])
            }}
            type='file'
            id='image'
            accept='image/*'
          />
        </div>
        <div
          className={cn('mt-4 flex justify-center', image ? 'flex' : 'hidden')}
        >
          <img
            src={image as string}
            alt='preview'
            height={120}
            width={120}
            className='border border-secondary rounded shadow-lg'
          />
        </div>
        <AlertDialogFooter className='mt-4'>
          <Button onClick={() => setOpen(false)} variant='primarysubtle'>
            Cancel
          </Button>
          <Button loading={loading} onClick={handleAction} variant='secondary'>
            Submit
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
