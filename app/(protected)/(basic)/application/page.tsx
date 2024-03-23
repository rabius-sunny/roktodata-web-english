'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  checkAppointmentAvailablity,
  createAppointment,
  getUserStatus
} from '@/actions/others'
import {
  appointmentSchema,
  TAppointmentData
} from '@/constants/schema/appointment'
import {
  confirmAlert,
  errorAlert,
  successAlert
} from '@/services/alerts/alerts'
import requests from '@/services/network/http'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  ImagePlus,
  PlusCircle,
  SendHorizonal,
  X
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GInput, GTextarea } from '@/components/customs/GInput'
import Container from '@/components/shared/Container'

type TInput = {
  id: number
  file: File | null
}
type TReceiverStatus = {
  profileStatus: TStatus | null
  requestStatus: TUserStatus | null
}

export default function Application() {
  const searchparams = useSearchParams()
  const [status, setStatus] = useState<TReceiverStatus>({
    profileStatus: null,
    requestStatus: null
  })
  const donor = searchparams.get('donor') as string
  const receiver = searchparams.get('receiver') as string
  const { replace } = useRouter()
  const [imageInputs, setImageInputs] = useState<TInput[]>([
    { id: 0, file: null }
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedImages, setSelectedImages] = useState<
    (string | ArrayBuffer | null)[]
  >([])

  let formStatus =
    status.profileStatus === 'PENDING' || status.requestStatus === 'REQUESTED'

  useEffect(() => {
    const getData = async () => {
      const { error, data } = await getUserStatus(receiver)
      if (error) errorAlert({ title: 'Error occurred', body: error })
      if (data) setStatus(data)
    }
    getData()
  }, [receiver])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAppointmentData>({
    resolver: zodResolver(appointmentSchema)
  })

  const handleDelete = (id: number) =>
    setImageInputs((prevInputs) =>
      prevInputs.filter((input) => input.id !== id)
    )
  const addImageInput = () => {
    setImageInputs([...imageInputs, { id: count, file: null }])
    setCount((prev) => prev + 1)
  }
  const handleImageOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setImageInputs((prev) => {
        return prev.map((input) => {
          if (input.id === id) {
            return { ...input, file }
          } else {
            return input
          }
        })
      })
    }
  }
  const handleImageUpload = () => {
    setIsOpen(false)

    const updatedImages = imageInputs.map((input) => {
      const reader = new FileReader()
      reader.readAsDataURL(input.file as File)
      return new Promise<string | ArrayBuffer | null>((resolve) => {
        reader.onload = () => {
          resolve(reader.result)
        }
      })
    })

    Promise.all(updatedImages).then((images) => {
      setSelectedImages((prevImages) => [
        ...prevImages,
        ...images.filter((image) => !!image)
      ])
    })
  }
  const uploadImage = async () => {
    const imageData = new FormData()
    if (imageInputs[0].file) {
      imageInputs.forEach((item) => {
        const file = item.file
        if (file instanceof File) {
          imageData.append('files', file)
        }
      })
    }
    try {
      const uploadImagesRes = await requests.post(
        '/api/uploadthing/upload',
        imageData
      )
      if (uploadImagesRes.ok) {
        return uploadImagesRes.data
      } else throw new Error('something went wrong!')
    } catch (error) {
      setLoading(false)
      errorAlert({
        title: 'Error occurred',
        body: 'Failed to upload the images. Please try again.'
      })
    }
  }

  const onSubmit = async (inputData: TAppointmentData) => {
    if (imageInputs.length === 1 && !imageInputs[0].file) {
      return errorAlert({
        title: 'No image uploaded yet.',
        body: 'To complete the application, related docs image(s) is required.',
        timer: 5000
      })
    }
    setLoading(true)
    try {
      const check = await checkAppointmentAvailablity(donor, receiver)
      if (check.error) {
        setLoading(false)
        return errorAlert({
          body: check.error
        })
      }

      const images = await uploadImage()
      if (!images) return
      const fields = {
        ...inputData,
        images,
        donor,
        receiver,
        scheduledAt: new Date()
      }
      const res = await createAppointment(fields)
      if (res.ok) {
        successAlert({
          body: 'Application is waiting for approval, you will be notified.'
        })
        replace('/')
      }

      if (res.error)
        errorAlert({
          title: 'Error occurred',
          body: res.error
        })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      errorAlert({
        title: 'Error occurred',
        body: 'Try again.'
      })
    }
  }

  return (
    <div>
      <Container size='sm' className='pb-40'>
        <h1 className='text-center mt-8'>Application form</h1>
        <hr />
        <form
          className='flex flex-col gap-2 my-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          {formStatus && (
            <Alert variant='info' className='mb-8'>
              <AlertCircle className='size-6' />
              <AlertTitle>Important notice</AlertTitle>
              <AlertDescription>
                {status.profileStatus === 'PENDING' &&
                  'We are reviewing your previoius form info. You will be notified when we approve, then you can fill this form.'}
                {status.requestStatus === 'REQUESTED' &&
                  'You have already submitted a application. After reviewing that, you can submit another one.'}
              </AlertDescription>
            </Alert>
          )}
          <GTextarea
            compact
            register={register}
            label='Hospital Info.'
            message={errors.hospitalInfo?.message}
            name='hospitalInfo'
          />
          <GTextarea
            compact
            register={register}
            label='Current Address'
            message={errors.address?.message}
            name='address'
          />
          <GInput
            type='datetime-local'
            register={register}
            label='Date & Time'
            name='scheduledAt'
            message={errors.scheduledAt?.message}
          />
          <GTextarea
            compact
            register={register}
            label='Others Info.'
            message={errors.additionalInfo?.message}
            name='additionalInfo'
            optional
          />

          <div className='mt-24 flex sm:justify-end'>
            <Button
              shadow={!loading && !formStatus}
              type='submit'
              className={loading ? 'w-full sm:w-28' : 'w-full sm:w-auto'}
              loading={loading}
              disabled={loading || formStatus}
            >
              Complete application <SendHorizonal className='size-4' />
            </Button>
          </div>
        </form>

        <div className='-mt-40'>
          <Button
            type='button'
            variant='secondarysubtle'
            className='w-full shadow'
            size='lg'
            disabled={loading || formStatus}
            onClick={() =>
              imageInputs[0].file
                ? confirmAlert({
                    title: 'Delete Notice',
                    body: `You've already selected ${imageInputs.length} images. Previous data will be cancelled on new selection.`,
                    confirm: 'Confirm',
                    cancel: 'Cancel',
                    precom: () => {
                      setIsOpen(true)
                      setImageInputs([{ id: 0, file: null }])
                      setSelectedImages([])
                    }
                  })
                : setIsOpen(true)
            }
          >
            <ImagePlus /> Upload image(s) of documents.
          </Button>
        </div>

        <AlertDialog open={isOpen}>
          <AlertDialogContent className='max-h-[600px] overflow-y-auto'>
            <AlertDialogHeader builtin>Upload Images</AlertDialogHeader>
            <AlertDialogDescription>
              Upload the photos of prescription, blood test report and others
              related documents. Maximum 5 photos and each size 5mb.
            </AlertDialogDescription>
            <form action={handleImageUpload}>
              {imageInputs.map((item, idx) => (
                <div
                  key={idx}
                  className='flex items-center justify-between gap-2 '
                >
                  <Input
                    compact
                    name='files'
                    required
                    type='file'
                    accept='image/*'
                    className='mb-4'
                    disabled={loading}
                    onChange={(e) => handleImageOnChange(e, item.id)}
                  />
                  {imageInputs.length !== 1 && (
                    <X
                      onClick={() => handleDelete(item.id)}
                      className=' bg-red-600 text-white rounded-full px-1 cursor-pointer hover:bg-secondary mb-4'
                      strokeWidth={3}
                    />
                  )}
                </div>
              ))}
              <Button
                disabled={imageInputs.length === 5 || loading}
                size='sm'
                type='button'
                className=' bg-success/10 text-success shadow'
                onClick={addImageInput}
              >
                <PlusCircle className='size-5' />
                attach more
              </Button>

              <AlertDialogFooter className='gap-3 sm:gap-0 flex-col-reverse mt-4'>
                <Button
                  disabled={loading}
                  onClick={() => {
                    if (
                      window.confirm(
                        'All selected photos will be removed. Sure?'
                      )
                    ) {
                      setImageInputs([{ id: 0, file: null }])
                      setSelectedImages([])
                      setIsOpen(false)
                    }
                  }}
                  variant='outline'
                  type='button'
                  className='text-primary disabled:text-litetext'
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  variant='secondary'
                  className='w-full sm:w-auto'
                >
                  Confirm
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>

        {/** @TODO Handle image preview layout */}
        {selectedImages.length ? (
          <div className='mt-28'>
            <h1>Image Preview</h1>
            <hr className='mb-4' />
            <div className='image-row'>
              {selectedImages.map((item, idx) => (
                <div key={idx} className='image-column'>
                  {item && (
                    <Image
                      src={item.toString()}
                      alt='preview images'
                      width={300}
                      height={250}
                      className='w-full img'
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  )
}
