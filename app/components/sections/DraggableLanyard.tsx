'use client'

import ProfileCard from '@/components/ProfileCard'
import { motion } from 'motion/react'
import { useRef } from 'react'

export default function DraggableLanyard() {
  const constraintsRef = useRef<HTMLDivElement | null>(null)
  const PORTRAIT_SRC = '/joselson-badge-picture.png'

  return (
    <div
      ref={constraintsRef}
      className='relative mt-4 flex min-h-[620px] items-start justify-center overflow-visible px-2 pt-8'
    >
      <div className='pointer-events-none absolute top-1 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border border-foreground/25 bg-foreground/10' />

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        dragElastic={0.18}
        whileDrag={{ rotate: 0, scale: 1.02 }}
        whileTap={{ cursor: 'grabbing' }}
        className='lanyard-swing relative w-full max-w-[22rem] cursor-grab pt-24'
      >
        <div className='pointer-events-none absolute top-0 left-1/2 h-[5.5rem] w-[3px] -translate-x-1/2 bg-linear-to-b from-foreground/40 via-foreground/28 to-foreground/12' />
        <div className='pointer-events-none absolute top-20 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border border-foreground/30 bg-background/50' />

        <ProfileCard
          name='Joselson Dias'
          title='Software Engineer @ Your Company'
          handle='joselsondias'
          status='Open to opportunities'
          contactText='Connect'
          avatarUrl={PORTRAIT_SRC}
          miniAvatarUrl={PORTRAIT_SRC}
          iconUrl='https://cdn.simpleicons.org/linkedin'
          grainUrl='https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80'
          showUserInfo={true}
        />
      </motion.div>
    </div>
  )
}
