'use client'
import React, { useEffect } from 'react'
// import { environment } from './environment'
import { scene } from './environment/scene'

// we initialize this canvas as a JSX object, storing the current state in a Ref so that it doesn't get affected by reacts rendering logic
export function Background(props: { className?: string }) {
  const CanvasRef = React.useRef<HTMLCanvasElement>(null) // Create a new ref that stores the current canvas state, when the environment loads, this ref updates with the actual canvas of the 3d environment
  const [isLoaded, setIsLoaded] = React.useState(false);

  const Canvas = () => {
    useEffect(() => {
      if (CanvasRef.current != null) {
        scene(CanvasRef.current, () => {
          setIsLoaded(true);
        })
      }
    })

    return (<canvas ref={CanvasRef} {...props} />)
  }

  return (
    <div>
      {!isLoaded ? <div className="bg-[#7096d4] fixed w-screen h-screen z-10" /> : false}
      {Canvas()}
    </div>
  )
}
