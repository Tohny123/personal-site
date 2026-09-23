import { Metadata } from "next"
export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Check out my blog!'
}


export default function Layout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='w-full flex flex-1 flex-col items-center p-20' >
      {children}
    </div>
  )
}
