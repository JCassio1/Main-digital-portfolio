'use client'

import { useRef, useState, type PropsWithChildren, type ReactNode } from 'react'

type Position = {
  x: number
  y: number
}

type SpotlightCardProps = PropsWithChildren<{
  className?: string
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
}>

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)'
}: SpotlightCardProps): ReactNode {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!divRef.current || isFocused) return

    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top })
  }

  const handleFocus = (): void => {
    setIsFocused(true)
    setOpacity(0.6)
  }

  const handleBlur = (): void => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = (): void => {
    setOpacity(0.6)
  }

  const handleMouseLeave = (): void => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-8 ${className}`}
    >
      <div
        className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out'
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
        }}
      />
      {children}
    </div>
  )
}
