'use client'

import { createDonorProfile, updateReceiverProfile } from '@/actions/admin'
import { confirmAlertAsync } from '@/services/alerts/alerts'
import { MoreVertical } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import CMenu from '../customs/CMenu'

type TProps = {
  title: string
  data: TUser[] | undefined
  userType: TUserType
}

export default function RequestTable({ title, data, userType }: TProps) {
  return (
    <>
      <h1 className='text-center my-8 text-secondary'>{title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-40'>name</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>identity</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>

        {!data?.length && (
          <TableCaption>
            <h1 className='text-primary h-40 flex items-center justify-center'>
              No data found.
            </h1>
          </TableCaption>
        )}
        <TableBody>
          {data?.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className='min-w-40'>{item.name}</TableCell>
              <TableCell>{item.bloodType}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.identity}</TableCell>
              <TableCell className='w-20'>
                <CMenu
                  trigger={<MoreVertical />}
                  actions={requestActions(item, userType)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>{/** @TODO Add Pagination here */}</TableFooter>
      </Table>
    </>
  )
}

const requestActions = ({ id, bloodType }: TUser, userType: TUserType) => {
  if (userType === 'DONOR')
    return [
      {
        name: 'accept',
        action: () =>
          confirmAlertAsync({
            title: 'Confirm the request?',
            body: 'After the confirmation, a new donor profile will be created against the user.',
            precom: () =>
              createDonorProfile({
                bloodType,
                id,
                status: 'ACCEPTED'
              }),
            successText: 'Successfully created donor profile.'
          })
      },
      {
        name: 'reject',
        action: () =>
          confirmAlertAsync({
            title: 'Reject the request?',
            body: 'On rejection, no profile will be created.',
            precom: () =>
              createDonorProfile({
                bloodType,
                id,
                status: 'REJECTED'
              }),
            successText: 'Request has been rejected.'
          })
      }
    ]
  else
    return [
      {
        name: 'accept',
        action: () =>
          confirmAlertAsync({
            title: 'Confirm the request?',
            body: 'After the confirmation, a new receiver profile will be created against the user.',
            precom: () =>
              updateReceiverProfile({
                id,
                status: 'ACCEPTED'
              }),
            successText: 'Successfully created the receiver profile.'
          })
      },
      {
        name: 'reject',
        action: () =>
          confirmAlertAsync({
            title: 'Reject the request?',
            body: 'On rejection, no profile will be created.',
            precom: () =>
              updateReceiverProfile({
                id,
                status: 'REJECTED'
              }),
            successText: 'Successfully rejected the requested.'
          })
      }
    ]
}
