import './button.css'
import Link from 'next/link'

export function Button ({ text = 'Hello', showLabel = true, href = '/' }) {
  return (
    <Link href={href}>
      <button className='flex flex-row gap-3'>
        {showLabel ? <div>label</div> : ' '}
        {text}
      </button>
    </Link>
  )
}
