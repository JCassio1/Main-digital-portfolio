import SpotlightCard from '@/components/SpotlightCard'
import TextLoop from '@/components/TextLoop'
import { ShieldCheck, Sparkles, Wrench } from 'lucide-react'

type SolvableCard = {
  title: string
  body: string
  Icon: typeof Sparkles
}

const SOLVABLE_CARDS: readonly SolvableCard[] = [
  {
    title: 'Automate the Busywork',
    body: "Manual work doesn't feel urgent, until it's eaten a full day of your team's week. I build the automation for that.",
    Icon: Sparkles
  },
  {
    title: 'Refactor Before It Rots',
    body: "Code gets harder to touch every month. I refactor it before it's unworkable. The UI/UX as well",
    Icon: Wrench
  },
  {
    title: 'Close Security Gaps',
    body: "Tools with security gaps nobody's had time to address. I find and fix them before they become incidents.",
    Icon: ShieldCheck
  }
]

export default function Solvables() {
  return (
    <section
      id='solvables'
      className='solvables-section w-full px-6 pt-20 pb-10 sm:px-10 sm:pt-24'
    >
      <div className='mx-auto flex w-full max-w-275 flex-col'>
        <h2 className='pb-12 text-[2rem] leading-tight tracking-tight font-medium sm:text-[2.35rem]'>
          <span className='text-foreground/75'>Everything is probably fine.</span>{' '}
          <span className='text-foreground'>Until It Isn't</span>
        </h2>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          {SOLVABLE_CARDS.map(({ title, body, Icon }) => (
            <SpotlightCard
              key={title}
              className='h-full'
              spotlightColor='rgba(8, 10, 234, 1)'
            >
              <div className='flex items-start gap-3'>
                <span className='mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background/70'>
                  <Icon
                    className='h-4 w-4 text-foreground/80'
                    aria-hidden='true'
                  />
                </span>
                <div className='space-y-2'>
                  <h3 className='text-lg leading-tight font-semibold text-foreground'>{title}</h3>
                  <p className='text-base leading-relaxed text-foreground/85'>{body}</p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <div className='relative left-1/2 -mt-8 w-screen -translate-x-1/2 sm:-mt-28'>
          <TextLoop
            text='Automation ✦ Refactoring ✦ Security ✦ Reliability'
            separator='✦'
            shape='wave'
            speed={72}
            fontSize={24}
            letterSpacing={1.6}
            ribbonColor='rgba(8, 10, 234, 0.9)'
            ribbonWidth={54}
            color='rgba(255, 255, 255, 0.96)'
            pauseOnHover={false}
            curviness={56}
          />
        </div>
      </div>
    </section>
  )
}
