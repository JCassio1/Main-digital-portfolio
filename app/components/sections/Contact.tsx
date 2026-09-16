import { ContactButton } from '@/components/contact/contact-button'
import DraggableLanyard from '@/components/sections/DraggableLanyard'
import { ArrowUpRight, CircleUserRound } from 'lucide-react'

export default function Contact() {
  return (
    <section
      id='contact'
      className='w-full px-6 py-20 sm:px-10 sm:py-28'
    >
      <div className='mx-auto flex w-full max-w-275 flex-col items-center'>
        <div className='max-w-3xl text-center'>
          <p className='mb-4 text-sm font-medium tracking-[0.18em] text-[#a208ea] uppercase'>Contact</p>
          <h2 className='text-[2rem] leading-tight font-medium tracking-tight sm:text-[2.8rem]'>
            Let&rsquo;s find our synergy?
          </h2>

          <div className='mt-7 flex flex-wrap items-center justify-center gap-3 sm:flex-nowrap'>
            <a
              href='https://www.linkedin.com/in/joselsondias/'
              target='_blank'
              rel='noreferrer'
              aria-label='Visit Joselson Dias on LinkedIn'
              className='border border-foreground/10 focus-ring group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/4'
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
            </a>
            <div className='basis-full sm:basis-auto'>
              <ContactButton />
            </div>
          </div>
        </div>

        <div className='mt-12 flex w-full max-w-4xl flex-col items-center gap-8'>
          <article className='w-full max-w-2xl text-center'>
            <p className='text-xs font-medium tracking-[0.15em] text-foreground/70 uppercase'>Profile card</p>
            <p className='mt-3 text-sm leading-relaxed text-foreground/75'>
              Open my CV for project outcomes, delivery scope, and stack details.
            </p>
            <a
              href='https://docs.google.com/document/d/1iYvRaKrsTRxZZKzdn2tabSsjR9qSee5bWav_pNcq84U/edit?usp=sharing'
              target='_blank'
              rel='noreferrer'
              aria-label='Open Joselson CV'
              className='focus-ring mt-4 inline-flex items-center gap-2 rounded-xl border border-foreground/15 bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5'
            >
              Open full CV
              <ArrowUpRight
                className='h-4 w-4'
                aria-hidden='true'
              />
            </a>
          </article>

          <article className='w-full max-w-2xl'>
            <p className='text-xs font-medium tracking-[0.15em] text-foreground/70 uppercase'>Lanyard</p>
            <p className='mt-3 text-sm text-foreground/75'>Drag the lanyard for a closer look.</p>
            <DraggableLanyard />
          </article>
        </div>
      </div>
    </section>
  )
}
