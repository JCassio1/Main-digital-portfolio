'use client'

import { Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'

type NavItem = {
  label: string
  href: `#${string}`
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '#landing' },
  { label: 'Solvables', href: '#solvables' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
]

function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

function NavThemeToggle(): ReactNode {
  const mounted = useIsMounted()
  const { setTheme, resolvedTheme } = useTheme()
  const isDark = mounted && resolvedTheme === 'dark'

  const toggleTheme = (): void => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label={mounted ? (isDark ? 'Switch to light theme' : 'Switch to dark theme') : 'Toggle theme'}
      aria-pressed={mounted ? isDark : undefined}
      className='focus-ring relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-background ring-1 ring-foreground/8 transition-colors'
    >
      <span
        aria-hidden='true'
        className='relative h-4 w-4'
      >
        <Sun
          className={`absolute inset-0 h-4 w-4 text-foreground transition-all duration-300 ${
            mounted && isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-4 w-4 text-foreground transition-all duration-300 ${
            mounted && !isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
          }`}
        />
      </span>
    </button>
  )
}

export default function Navbar(): ReactNode {
  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const [activeHref, setActiveHref] = useState<NavItem['href']>('#landing')
  const [pillRect, setPillRect] = useState<{ x: number; width: number } | null>(null)
  const [hasMeasured, setHasMeasured] = useState(false)

  const activeIndex = NAV_ITEMS.findIndex((item) => item.href === activeHref)

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(
      (section): section is HTMLElement => section instanceof HTMLElement
    )
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveHref(`#${visible.target.id}` as NavItem['href'])
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const list = listRef.current
    const activeElement = activeIndex >= 0 ? itemRefs.current[activeIndex] : null
    if (!list || !activeElement) return
    const listRect = list.getBoundingClientRect()
    const itemRect = activeElement.getBoundingClientRect()
    setPillRect({ x: itemRect.left - listRect.left, width: itemRect.width })
  }, [activeIndex])

  useEffect(() => {
    if (!pillRect) return
    const id = requestAnimationFrame(() => setHasMeasured(true))
    return () => cancelAnimationFrame(id)
  }, [pillRect])

  return (
    <nav
      aria-label='Primary'
      className='fixed left-1/2 top-6 z-50 -translate-x-1/2'
    >
      <div className='flex max-w-[calc(100vw-2rem)] items-center gap-1 overflow-x-auto rounded-full border border-foreground/8 bg-background p-1.5 shadow-sm'>
        <ul
          ref={listRef}
          className='relative flex items-center gap-1'
        >
          {pillRect && (
            <motion.span
              aria-hidden='true'
              initial={false}
              animate={{ x: pillRect.x, width: pillRect.width }}
              transition={hasMeasured ? { type: 'spring', stiffness: 380, damping: 32 } : { duration: 0 }}
              style={{ left: 0, top: 0, bottom: 0 }}
              className='absolute rounded-full bg-foreground/5 ring-1 ring-foreground/8'
            />
          )}
          {NAV_ITEMS.map((item, index) => {
            const isActive = item.href === activeHref
            return (
              <li
                key={item.href}
                ref={(element) => {
                  itemRefs.current[index] = element
                }}
                className='relative'
              >
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setActiveHref(item.href)}
                  className='focus-ring relative inline-flex cursor-pointer items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 sm:px-4'
                >
                  <span
                    className={
                      isActive
                        ? 'relative z-10 text-foreground'
                        : 'relative z-10 text-foreground/60 hover:text-foreground'
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
        <NavThemeToggle />
      </div>
    </nav>
  )
}
