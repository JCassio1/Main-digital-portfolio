import type { ReactNode } from 'react'
import ExperienceStack from '@/components/sections/ExperienceStack'

const EXPERIENCE_ITEMS = [
  {
    company: 'Jaguar Land Rover PLC',
    role: 'Software Engineer',
    period: '01/2024 — Present',
    location: 'Gaydon, U.K. (Hybrid)'
  },
  {
    company: 'Costain Group PLC',
    role: 'Software Engineer',
    period: '08/2021 — 12/2023',
    location: 'Maidenhead, U.K. (Remote)'
  },
  {
    company: 'A.E Otchitanda LTD',
    role: 'Co-Founder & Software Developer',
    period: '02/2018 — 03/2020',
    location: 'Remote'
  }
] as const

const INDUSTRIES = [
  {
    name: 'Automotive',
    detail: 'Engineering software and workflows for automotive programs'
  },
  {
    name: 'Civil Engineering',
    detail: 'Contributing software solutions in infrastructure-focused teams'
  },
  {
    name: 'ECommerce',
    detail: 'Building and improving digital commerce experiences'
  }
] as const

const WHAT_I_DO = [
  'Automation & integrations',
  'Frontend engineering',
  'Backend systems and APIs',
  'Refactoring legacy codebases',
  'Security-focused improvements',
  'Adapt quickly to changing priorities',
  'End-to-end testing',
  'Jira',
  'UI/UX Design',
  'Design Systems',
  'Design Systems',
  'AI'
] as const

export default function Experience() {
  return (
    <section
      id='experience'
      className='w-full px-6 py-20 sm:px-10 sm:py-28'
    >
      <div className='mx-auto w-full max-w-275'>
        <div className='max-w-3xl'>
          <p className='mb-4 text-sm font-medium tracking-[0.18em] text-[#a208ea] uppercase'>
            Experience
          </p>
          <h2 className='text-[2rem] leading-tight font-medium tracking-tight sm:text-[2.8rem]'>
            Background & Capabilities
          </h2>
        </div>

        <div className='mt-12 grid grid-cols-1 gap-5 md:grid-cols-2'>
          <Panel title='Experience'>
            <ul className='space-y-3'>
              {EXPERIENCE_ITEMS.map((item) => (
                <li
                  key={`${item.company}-${item.period}`}
                  className='rounded-2xl border border-white/10 bg-white/5 p-4'
                >
                  <p className='text-lg font-medium text-white'>{item.company}</p>
                  <p className='mt-1 text-sm text-white/70'>
                    {item.role}
                    <span className='mx-2 text-white/30'>•</span>
                    {item.period}
                  </p>
                  <p className='mt-1 text-sm text-white/55'>{item.location}</p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title='Industries'>
            <ul className='space-y-3'>
              {INDUSTRIES.map((item) => (
                <li
                  key={item.name}
                  className='rounded-2xl border border-white/10 bg-white/5 p-4'
                >
                  <p className='text-base font-medium text-white'>{item.name}</p>
                  <p className='mt-1 text-sm leading-relaxed text-white/65'>{item.detail}</p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title='What I do'>
            <div className='flex flex-wrap gap-2'>
              {WHAT_I_DO.map((item) => (
                <span
                  key={item}
                  className='rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-sm text-white/85'
                >
                  {item}
                </span>
              ))}
            </div>
          </Panel>

          <Panel title='Stack'>
            <ExperienceStack />
          </Panel>
        </div>
      </div>
    </section>
  )
}

function Panel({
  title,
  children
}: {
  title: string
  children: ReactNode
}) {
  return (
    <article className='rounded-3xl border border-white/15 bg-[#1b1a1a] p-5 sm:p-6'>
      <h3 className='text-lg font-medium tracking-tight text-white'>{title}</h3>
      <div className='mt-4'>{children}</div>
    </article>
  )
}
