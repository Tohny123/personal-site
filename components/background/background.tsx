'use client'
import React, { useEffect, useRef, useState, ViewTransition, startTransition } from 'react'
// import { environment } from './environment'
import { Scene } from './environment/scene'

// we initialize this canvas as a JSX object, storing the current state in a Ref so that it doesn't get affected by reacts rendering logic
export function Background(props: { className?: string }) {
  const CanvasRef = useRef<HTMLCanvasElement>(null) // Create a new ref that stores the current canvas state, when the environment loads, this ref updates with the actual canvas of the 3d environment
  const SceneRef = useRef<Scene>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  //TODO: this useEffect causes react to run the function twice, that aint good 

  const Canvas = () => {
    useEffect(() => {
      if (CanvasRef.current != null) {
        // scene(CanvasRef.current, () => {
        //   setIsLoaded(true);
        // })
        SceneRef.current = new Scene(CanvasRef.current, () => {
          startTransition(() => {
            setIsLoaded(true);
          })
        });
      }
    })

    return (<canvas ref={CanvasRef} {...props} />)
  }

  return (
    <div>
      {!isLoaded ?
        <ViewTransition enter="auto" exit="auto" default="none">
          <div className="bg-[#7096d4] fixed w-screen h-screen" />
        </ViewTransition>
        :
        false}
      {Canvas()}
    </div>
  )
}
