import {
  HeartPulse,
  HeartPulseIcon,
  LayoutDashboard,
  LucideIcon,
  ScrollText,
  Settings2,
  Settings2Icon,
  Star,
  Syringe,
  UserCog2
} from 'lucide-react'

export type TSiteInfo = typeof siteInfo
export type TNavItem = {
  name: string
  href: string
  icon: LucideIcon
  child?: {
    name: string
    href: string
  }[]
}
export const siteInfo = {
  name: 'Roktodata',
  description: 'Blood Donation Web Application',
  authors: {
    url: 'https://rabius-sunny.vercel.app',
    name: 'Rabius Sunny'
  },
  generator: 'blood blood-donation donation donate blood blood-groups',
  navItems: [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Help', href: '/help' },
    { name: 'Forum', href: '/forum' },
    { name: 'Contact', href: '/contact' }
  ],
  donorDashboardItem: [
    { name: 'Dashboard', href: '/dashboard/donor', icon: LayoutDashboard },
    {
      name: 'Appointments',
      href: '/dashboard/donor/appointments',
      icon: ScrollText
    },
    {
      name: 'My Donations',
      href: '/dashboard/donor/donations',
      icon: HeartPulse
    },
    { name: 'Reviews', href: '/dashboard/donor/reviews', icon: Star },
    { name: 'Profile', href: '/dashboard/donor/profile', icon: UserCog2 },
    { name: 'Settings', href: '/dashboard/donor/settings', icon: Settings2Icon }
  ],
  userDashboardItem: [
    { name: 'Profile', href: '/dashboard/receiver', icon: UserCog2 },
    {
      name: 'Appointments',
      href: '/dashboard/receiver/appointments',
      icon: ScrollText
    },
    {
      name: 'Receipts',
      href: '/dashboard/receiver/receipts',
      icon: ScrollText
    }
  ],
  adminDashboardItem: [
    { name: 'Donor Requests', href: '/dashboard/admin', icon: HeartPulseIcon },
    {
      name: 'Receiver Requests',
      href: '/dashboard/admin/receiver-requests',
      icon: Syringe
    },
    {
      name: 'Appointments',
      href: '/dashboard/admin/appointments',
      icon: ScrollText,
      child: [
        {
          name: 'Unverified Appointments',
          href: '/dashboard/admin/appointments/unverified'
        },
        {
          name: 'Pending Appointments',
          href: '/dashboard/admin/appointments/pending'
        },
        {
          name: 'Accepted Appointments',
          href: '/dashboard/admin/appointments/accepted'
        },
        {
          name: 'Canceled Appointments',
          href: '/dashboard/admin/appointments/canceled'
        },
        {
          name: 'Rejected Appointments',
          href: '/dashboard/admin/appointments/rejected'
        }
      ]
    },
    {
      name: 'All Donor',
      href: '/dashboard/admin/all-donors',
      icon: HeartPulseIcon
    },
    {
      name: 'All Receiver',
      href: '/dashboard/admin/all-receivers',
      icon: Syringe
    },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings2 }
  ]
}

export const api =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4050'
    : 'https://roktodata.com'
