import { Button } from '../ui/button'

const showBack: boolean = true

export function Header () {
  return (
    <div className='bg-red-400/75 p-4 w-full flex items-center justify-center sticky top-0'>
      <div className='  flex-auto'>
        {showBack ? <Button /> : ''}
      </div>

      <div className=' flex-auto flex flex-row justify-end gap-3'>
        <Button text='Hi' showLabel={false} />
        <Button text='Hi2' />
        <Button text='Hi3' />
      </div>
    </div>
  )
}
