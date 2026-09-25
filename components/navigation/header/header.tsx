'use client'; //im not sure this is the *best* but idk how else to call elements of the client
import { Button } from '../../ui/button/button'
import { HideHeader } from "./hideHeader"
import { PiHouse } from "react-icons/pi";
import { PiBookOpen } from "react-icons/pi";
import { PiHammer } from "react-icons/pi";

export function Header() {
  const isHidden: boolean = HideHeader();
  //default consts of the header, and we adjust the offsets depending on scrollDirection
  const headerClass = 'shadow-xl sticky z-100 bg-transparent w-full ' + 
  'flex flex-row p-4 ' +
  'flex items-center justify-center h-24 ' + 
  'backdrop-blur-md ' +
  'transition-all duration-250 bounce-transition' +
  (isHidden ? " -top-24" : " top-0");
  return (
    <div className={headerClass}>
      <div className='flex-auto '>
        <Button Icon={PiHouse} text="Home" href="/" />
      </div>

      <div className='flex-auto flex flex-row justify-end gap-3'>
        {/* ?        <Button text='Hi2' /> */}
        <Button Icon={PiBookOpen} text='Blog' href='/blog' />
        <Button Icon={PiHammer} text='Projects' href='/projects' />

        {/* <Button text='Hi3' /> */}
      </div>
    </div>
  )
}
