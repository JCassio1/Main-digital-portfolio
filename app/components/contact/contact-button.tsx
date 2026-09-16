'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy, Mail } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'

const EMAIL = 'joselsoncareers@gmail.com'
const EASE = [0.22, 1, 0.36, 1] as const

export function ContactButton(): ReactNode {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = EMAIL
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
      } catch {}
      document.body.removeChild(ta)
    }
  }

  return (
    <motion.div
      layout
      className='relative h-10 max-w-full shrink-0 overflow-hidden'
      animate={{ width: open ? '19rem' : '7rem' }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <motion.button
        type='button'
        layout
        onClick={handleCopy}
        onHoverStart={() => {
          setOpen(true)
        }}
        onHoverEnd={() => {
          setOpen(false)
        }}
        onFocus={() => {
          setOpen(true)
        }}
        onBlur={() => {
          setOpen(false)
        }}
        aria-label={copied ? 'Email copied' : open ? `Copy ${EMAIL}` : 'Show email'}
        transition={{ layout: { duration: 0.55, ease: EASE } }}
        className='inline-flex h-10 w-full cursor-pointer items-center gap-2 rounded-xl border border-foreground/5 bg-background px-4 text-sm font-medium text-foreground shadow-2xl transition-colors hover:bg-foreground/4 focus-ring whitespace-nowrap'
      >
        <AnimatePresence
          initial={false}
          mode='popLayout'
        >
          {open ? (
            <motion.span
              key='email'
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.35, ease: EASE }}
              className='inline-flex items-center gap-2 whitespace-nowrap'
            >
              {copied ? (
                <Check
                  className='h-4 w-4 shrink-0'
                  aria-hidden='true'
                />
              ) : (
                <Copy
                  className='h-4 w-4 shrink-0'
                  aria-hidden='true'
                />
              )}
              <span className='tabular-nums'>{EMAIL}</span>
            </motion.span>
          ) : (
            <motion.span
              key='contact'
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.35, ease: EASE }}
              className='inline-flex items-center gap-2 whitespace-nowrap'
            >
              <Mail
                className='h-4 w-4 shrink-0'
                aria-hidden='true'
              />
              <span>Contact</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}
