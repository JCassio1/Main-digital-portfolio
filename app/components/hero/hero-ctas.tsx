'use client'

import { ArrowUpRight, BookOpenText, CircleUserRound } from 'lucide-react'
import { LayoutGroup, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { ContactButton } from '@/components/contact/contact-button'

const EASE = [0.22, 1, 0.36, 1] as const

export function HeroCtas(): ReactNode {
  return (
    <LayoutGroup>
      <motion.div
        layout
        transition={{ layout: { duration: 0.55, ease: EASE } }}
        className='mt-2 flex flex-wrap items-center gap-3 sm:flex-nowrap'
      >
        <motion.a
          layout
          href='https://www.linkedin.com/in/joselsondias/'
          target='_blank'
          rel='noreferrer'
          aria-label='Visit Joselson Dias on LinkedIn'
          className='border border-foreground/5 focus-ring group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-2xl transition-colors hover:bg-foreground/4'
        >
          <CircleUserRound
            className='h-4 w-4'
            aria-hidden='true'
          />
          LinkedIn
          <ArrowUpRight
            className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5'
            aria-hidden='true'
          />
        </motion.a>
        <motion.a
          layout
          href='https://medium.com/@joselsondias'
          target='_blank'
          rel='noreferrer'
          aria-label='Read Joselson Dias on Medium'
          className='border border-foreground/5 focus-ring group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-2xl transition-colors hover:bg-foreground/4'
        >
          <BookOpenText
            className='h-4 w-4'
            aria-hidden='true'
          />
          Blog
          <ArrowUpRight
            className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5'
            aria-hidden='true'
          />
        </motion.a>
        <div className='basis-full sm:basis-auto'>
          <ContactButton />
        </div>
      </motion.div>
    </LayoutGroup>
  )
}
