'use client'

import { RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Body } from 'matter-js'

type Chip = {
  label: string
  slug: string
  bg: string
  fg: string
  iconUrl?: string
}

const CHIPS: Chip[] = [
  {
    label: 'Claude',
    slug: 'anthropic',
    bg: '#D97757',
    fg: '#ffffff',
    iconUrl: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/claude-color.png'
  },
  { label: 'Figma', slug: 'figma', bg: '#1f1f1f', fg: '#ffffff', iconUrl: 'https://cdn.simpleicons.org/figma' },
  {
    label: 'Tailwind CSS',
    slug: 'tailwindcss',
    bg: '#2BBCF5',
    fg: '#ffffff',
    iconUrl: 'https://cdn.simpleicons.org/tailwindcss'
  },
  {
    label: 'shadcn/ui',
    slug: 'shadcnui',
    bg: '#5b54ff',
    fg: '#ffffff',
    iconUrl: 'https://cdn.simpleicons.org/shadcnui'
  },
  { label: 'Python', slug: 'python', bg: '#3776AB', fg: '#ffffff', iconUrl: 'https://cdn.simpleicons.org/python' },
  {
    label: 'Node.js',
    slug: 'nodedotjs',
    bg: '#3C873A',
    fg: '#ffffff',
    iconUrl: 'https://cdn.simpleicons.org/nodedotjs'
  },
  { label: 'Flask', slug: 'flask', bg: '#111111', fg: '#ffffff', iconUrl: 'https://cdn.simpleicons.org/flask' },
  {
    label: 'AWS',
    slug: 'amazonaws',
    bg: '#232F3E',
    fg: '#ffffff',
    iconUrl: 'https://cdn.simpleicons.org/icloud' // IGNORE: Using iCloud icon for AWS as a placeholder
  },
  { label: 'OpenAI', slug: 'openai', bg: '#101010', fg: '#ffffff', iconUrl: 'https://svgl.app/library/openai.svg' },
  {
    label: 'RabbitMQ',
    slug: 'rabbitmq',
    bg: '#FF6600',
    fg: '#ffffff',
    iconUrl: 'https://cdn.simpleicons.org/rabbitmq'
  },
  {
    label: 'SQL / NoSQL',
    slug: 'postgresql',
    bg: '#334155',
    fg: '#ffffff',
    iconUrl: 'https://cdn.simpleicons.org/postgresql'
  },
  {
    label: 'SQL Server',
    slug: 'microsoftsqlserver',
    bg: '#CC2927',
    fg: '#ffffff',
    iconUrl: 'https://cdn.simpleicons.org/postgresql' // IGNORE: Using PostgreSQL icon for SQL Server as a placeholder
  },
  { label: 'Git', slug: 'git', bg: '#F05032', fg: '#ffffff', iconUrl: 'https://cdn.simpleicons.org/git' },
  { label: '3DX', slug: 'threedotjs', bg: '#111111', fg: '#ffffff', iconUrl: 'https://cdn.simpleicons.org/threedotjs' }
]

const CHIP_RADIUS = 14
const ICON_RADIUS = 10
const WALL_PAD = 16

type ChipState = {
  chip: Chip
  body: Body
  width: number
  height: number
}

export default function ExperienceStack(): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const measureRef = useRef<HTMLDivElement | null>(null)
  const chipRefs = useRef<Array<HTMLDivElement | null>>([])
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const measure = measureRef.current
    if (!container || !measure) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    void (async () => {
      const Matter = await import('matter-js')
      if (cancelled) return

      const { Engine, Runner, World, Bodies, Body, Mouse, MouseConstraint, Events } = Matter

      const measureChildren = Array.from(measure.children) as HTMLElement[]
      const dims = measureChildren.map((el) => {
        const rect = el.getBoundingClientRect()
        return { w: Math.max(80, rect.width), h: Math.max(28, rect.height) }
      })

      let width = container.clientWidth
      let height = container.clientHeight

      const engine = Engine.create()
      engine.gravity.y = 1
      const world = engine.world

      const wallThickness = 400
      const floor = Bodies.rectangle(width / 2, height - WALL_PAD + wallThickness / 2, width * 3, wallThickness, {
        isStatic: true
      })
      const leftWall = Bodies.rectangle(WALL_PAD - wallThickness / 2, height / 2, wallThickness, height * 4, {
        isStatic: true
      })
      const rightWall = Bodies.rectangle(width - WALL_PAD + wallThickness / 2, height / 2, wallThickness, height * 4, {
        isStatic: true
      })

      World.add(world, [floor, leftWall, rightWall])

      const states: ChipState[] = CHIPS.map((chip, index) => {
        const dim = dims[index] ?? { w: 120, h: 36 }
        const halfW = dim.w / 2
        const minX = WALL_PAD + halfW + 4
        const maxX = width - WALL_PAD - halfW - 4
        const x = minX + Math.random() * Math.max(1, maxX - minX)
        const y = -80 - index * 60 - Math.random() * 120

        const body = Bodies.rectangle(x, y, dim.w, dim.h, {
          chamfer: { radius: CHIP_RADIUS },
          restitution: 0.35,
          friction: 0.5,
          frictionAir: 0.025,
          density: 0.0018,
          angle: (Math.random() - 0.5) * 0.4
        })

        World.add(world, body)

        return { chip, body, width: dim.w, height: dim.h }
      })

      const mouse = Mouse.create(container)
      const wheelTarget = mouse.element as HTMLElement & { mousewheel?: EventListener }

      if (wheelTarget.mousewheel) {
        wheelTarget.removeEventListener('wheel', wheelTarget.mousewheel)
        wheelTarget.removeEventListener('DOMMouseScroll', wheelTarget.mousewheel)
      }

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          damping: 0.2,
          render: { visible: false }
        }
      })

      World.add(world, mouseConstraint)

      Events.on(mouseConstraint, 'startdrag', () => {
        container.style.cursor = 'grabbing'
      })

      Events.on(mouseConstraint, 'enddrag', () => {
        container.style.cursor = 'grab'
      })

      const runner = Runner.create()
      Runner.run(runner, engine)

      let raf = 0
      const tick = (): void => {
        for (let index = 0; index < states.length; index++) {
          const state = states[index]
          const element = chipRefs.current[index]
          if (!state || !element) continue

          const { x, y } = state.body.position
          element.style.transform = `translate3d(${x - state.width / 2}px, ${y - state.height / 2}px, 0) rotate(${
            state.body.angle
          }rad)`
        }

        raf = requestAnimationFrame(tick)
      }

      raf = requestAnimationFrame(tick)

      const onResize = (): void => {
        const newWidth = container.clientWidth
        const newHeight = container.clientHeight
        if (newWidth === width && newHeight === height) return

        Body.setPosition(floor, {
          x: newWidth / 2,
          y: newHeight - WALL_PAD + wallThickness / 2
        })

        Body.setPosition(leftWall, {
          x: WALL_PAD - wallThickness / 2,
          y: newHeight / 2
        })

        Body.setPosition(rightWall, {
          x: newWidth - WALL_PAD + wallThickness / 2,
          y: newHeight / 2
        })

        width = newWidth
        height = newHeight
      }

      const ro = new ResizeObserver(onResize)
      ro.observe(container)

      cleanup = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        Runner.stop(runner)
        World.clear(world, false)
        Engine.clear(engine)
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [resetKey])

  return (
    <div className='relative h-56 overflow-hidden rounded-2xl border border-white/10 bg-white/6 sm:h-64'>
      <button
        type='button'
        onClick={() => setResetKey((key) => key + 1)}
        aria-label='Reset stack'
        className='focus-ring absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-black/35 text-white/75 transition-colors hover:text-white'
      >
        <RotateCcw
          className='h-4 w-4'
          strokeWidth={2.25}
          aria-hidden='true'
        />
      </button>

      <div
        ref={measureRef}
        aria-hidden='true'
        className='pointer-events-none invisible absolute top-0 left-0 flex flex-wrap gap-2'
      >
        {CHIPS.map((chip) => (
          <ChipPill
            key={`m-${chip.label}`}
            chip={chip}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className='absolute inset-0 cursor-grab select-none'
        style={{ touchAction: 'none' }}
      >
        {CHIPS.map((chip, index) => (
          <div
            key={`${resetKey}-${chip.label}`}
            ref={(element) => {
              chipRefs.current[index] = element
            }}
            className='pointer-events-none absolute top-0 left-0 will-change-transform'
            style={{ transform: 'translate3d(-9999px, -9999px, 0)' }}
          >
            <ChipPill chip={chip} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ChipPill({ chip }: { chip: Chip }): ReactNode {
  return (
    <div
      className='inline-flex items-center gap-2 p-1 pr-2 text-[15px] font-medium tracking-tight ring-1 ring-white/15 sm:text-[16px]'
      style={{
        backgroundColor: chip.bg,
        color: chip.fg,
        borderRadius: `${CHIP_RADIUS}px`
      }}
    >
      <span
        className='inline-flex h-8 w-8 items-center justify-center bg-white/95'
        style={{ borderRadius: `${ICON_RADIUS}px` }}
        aria-hidden='true'
      >
        <img
          src={chip.iconUrl ?? `https://cdn.simpleicons.org/${chip.slug}`}
          alt=''
          width={18}
          height={18}
          className='h-5 w-5'
          draggable={false}
        />
      </span>
      <span>{chip.label}</span>
    </div>
  )
}
