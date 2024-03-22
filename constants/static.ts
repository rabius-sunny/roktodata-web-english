import {
  AtSign,
  HeartPulse,
  LucideIcon,
  MapPinned,
  Phone,
  Sun
} from 'lucide-react'

export type TDistrict = (typeof district)[0]
export type TWhydonate = {
  icon: LucideIcon
  title: string
  description: string
}

export const district = [
  'Dhaka',
  'Faridpur',
  'Gazipur',
  'Gopalganj',
  'Jamalpur',
  'Kishoreganj',
  'Madaripur',
  'Manikganj',
  'Munshiganj',
  'Mymensingh',
  'Narayanganj',
  'Narsingdi',
  'Netrokona',
  'Rajbari',
  'Shariatpur',
  'Sherpur',
  'Tangail',
  'Bogra',
  'Joypurhat',
  'Naogaon',
  'Natore',
  'Nawabganj',
  'Pabna',
  'Rajshahi',
  'Sirajgonj',
  'Dinajpur',
  'Gaibandha',
  'Kurigram',
  'Lalmonirhat',
  'Nilphamari',
  'Panchagarh',
  'Rangpur',
  'Thakurgaon',
  'Barguna',
  'Barisal',
  'Bhola',
  'Jhalokati',
  'Patuakhali',
  'Pirojpur',
  'Bandarban',
  'Brahmanbaria',
  'Chandpur',
  'Chittagong',
  'Comilla',
  "Cox's Bazar",
  'Feni',
  'Khagrachari',
  'Lakshmipur',
  'Noakhali',
  'Rangamati',
  'Habiganj',
  'Maulvibazar',
  'Sunamganj',
  'Sylhet',
  'Bagerhat',
  'Chuadanga',
  'Jessore',
  'Jhenaidah',
  'Khulna',
  'Kushtia',
  'Magura',
  'Meherpur',
  'Narail',
  'Satkhira'
]

export const donationimages: string[] = [
  '/images/donations/donate1.jpg',
  '/images/donations/donate2.jpg',
  '/images/donations/donate3.jpg'
]

export const bloodGroups: string[] = [
  'A+',
  'B+',
  'A-',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-'
]

export const whyDonate: TWhydonate[] = [
  {
    icon: HeartPulse,
    title: "Save other's life",
    description:
      ' culpa numquam distinctio quo sunt eligendi, ut assumenda veniam. Illum aut culpa similique quam! Dicta'
  },
  {
    icon: HeartPulse,
    title: "Save other's life",
    description:
      ' culpa numquam distinctio quo sunt eligendi, ut assumenda veniam. Illum aut culpa similique quam! Dicta'
  },
  {
    icon: HeartPulse,
    title: "Save other's life",
    description:
      ' culpa numquam distinctio quo sunt eligendi, ut assumenda veniam. Illum aut culpa similique quam! Dicta'
  },
  {
    icon: HeartPulse,
    title: "Save other's life",
    description:
      ' culpa numquam distinctio quo sunt eligendi, ut assumenda veniam. Illum aut culpa similique quam! Dicta'
  },
  {
    icon: HeartPulse,
    title: "Save other's life",
    description:
      ' culpa numquam distinctio quo sunt eligendi, ut assumenda veniam. Illum aut culpa similique quam! Dicta'
  },
  {
    icon: HeartPulse,
    title: "Save other's life",
    description:
      ' culpa numquam distinctio quo sunt eligendi, ut assumenda veniam. Illum aut culpa similique quam! Dicta'
  }
]

export const contactInfo: TWhydonate[] = [
  { icon: AtSign, title: 'Email', description: 'hello@roktodata.com' },
  { icon: Phone, title: 'Phone', description: '+880 1XXX XXXXXX' },
  { icon: MapPinned, title: 'Address', description: 'College Road, Rangpur' },
  { icon: Sun, title: 'Open hours', description: '24/7' }
]

export const genders = [
  { name: 'Male', value: 'MALE' },
  { name: 'Female', value: 'FEMALE' },
  { name: 'Others', value: 'OTHERS' }
]

export const userTypes = [
  { name: 'Donor', value: 'DONOR' },
  { name: 'Receiver', value: 'RECEIVER' }
]

export const religions = [
  { name: 'Islam', value: 'ISLAM' },
  { name: 'Christian', value: 'CHRISTIAN' },
  { name: 'Hindu', value: 'HINDU' },
  { name: 'Buddhist', value: 'BUDDHIST' },
  { name: 'Others', value: 'OTHERS' }
]
