'use client'; //im not sure this is the *best* but idk how else to call elements of the client
import { Button } from '../../ui/button'
import {  HideHeader } from "./hideHeader"




export function Header() {
  const isHidden : boolean = HideHeader();
  //default consts of the header, and we adjust the offsets depending on scrollDirection
  const headerClass = 'z-100 bg-gray-600 p-4 w-full flex items-center justify-center sticky h-24 transition-all duration-500' + 
  (isHidden ? " \-top-24" : " top-0");

  return (
    <div className={headerClass}>
      <div className='  flex-auto'>
        <Button />
      </div>

      <div className=' flex-auto flex flex-row justify-end gap-3'>
        <Button text='Hi' showLabel={false} />
        <Button text='Hi2' />
        <Button text='Hi3' />
      </div>
    </div>
  )
}
