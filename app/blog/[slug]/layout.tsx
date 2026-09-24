import { Button } from "@/components/ui/button/button"
import { PiArrowArcLeft } from "react-icons/pi"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='w-full flex flex-1 flex-col items-center p-10' >
      <div className = 'w-full'>
        <Button Icon={PiArrowArcLeft} text="Back" href="/blog" />
      </div>
      {children}
    </div>
  )
}
