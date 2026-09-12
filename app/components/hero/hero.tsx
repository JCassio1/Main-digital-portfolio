import type { ReactNode } from 'react'

import GradientWaves from '@/components/GradientWaves'
import { HeroCtas } from './hero-ctas'
import { FadeIn, ScaleUnblur } from '@/components/ui/motion-primitives'
import { PortraitMorph } from './portrait-morph'

const PORTRAIT_SRC = '/joselson-focus.webp'
const PORTRAIT_HOVER_SRC = '/joselson-not-focus.webp'

export function Hero(): ReactNode {
  return (
    <section className='relative w-full overflow-x-clip'>
      <div className='pointer-events-none absolute inset-0 z-0 opacity-70'>
        <GradientWaves
          horizonColor='#080aea'
          waveColor='#7400f7'
          crestColor='#08a8ea'
          brightness={1}
          opacity={1}
          fogDepth={22}
          mouseInteraction={true}
        />
      </div>
      <div className='mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32'>
        <div className='relative z-10 grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8'>
          <FadeIn className='flex flex-col gap-4'>
            <p className='text-[20px] leading-tight tracking-tight font-medium text-foreground'>
              Hey , I&rsquo;m Joselson
            </p>
            <h1 className='text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.65rem]'>
              <span className='block whitespace-nowrap'>Software Engineer</span>
            </h1>
            <p className='max-w-[34ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65'>
              I turn manual, error-prone work into automated systems your team can trust. All documented well enough to
              survive without me.
            </p>
            <HeroCtas />
          </FadeIn>
          <ScaleUnblur className='flex justify-stretch md:justify-end'>
            <div className='relative aspect-square w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm md:max-w-105'>
              <div className='relative h-full w-full overflow-hidden rounded-[1.6rem]'>
                <PortraitMorph
                  srcA={PORTRAIT_SRC}
                  srcB={PORTRAIT_HOVER_SRC}
                  alt='Joselson portrait'
                />
              </div>
            </div>
          </ScaleUnblur>
        </div>
      </div>
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-background/70 to-background sm:h-48' />
    </section>
  )
}
