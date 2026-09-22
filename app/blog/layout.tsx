export default function Layout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='w-full flex flex-1 flex-col items-center p-20' >
      {children}
    </div>
  )
}
