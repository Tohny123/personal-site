import { IconType } from 'react-icons'
import './button.css'
import Link from 'next/link'

interface buttonTypes {
  Icon?: IconType,
  text: string,
  href: string,
}

export function Button({ Icon, text = "TEXT", href = "/" }: buttonTypes) {
  return (
    <Link href={href}>
      <button className='flex flex-row gap-3 items-center'>
        {Icon ? <Icon size={26}/> : ' '}
        {text}
      </button>
    </Link>
  )
}
