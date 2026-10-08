'use client'
import React, { useEffect } from 'react'
import { environment } from './environment'

// we initialize this canvas as a JSX object, storing the current state in a Ref so that it doesn't get affected by reacts rendering logic

interface propsType {
  className?: string
}

const Canvas = (ref: React.Ref<HTMLCanvasElement>, props: propsType) => {
  return (<canvas ref={ref} {...props} />)
}


export function Background(props:propsType) {
  const CanvasRef = React.useRef<HTMLCanvasElement>(null) // Create a new ref that stores the current canvas state
  useEffect(() => {
    if (CanvasRef.current != null) {
      return environment(CanvasRef.current)
    }
  })

  return (
    <div>
      {Canvas(CanvasRef, props)}
    </div>
  )
}
