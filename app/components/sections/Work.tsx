import TiltedCard from '@/components/TiltedCard'
import { ArrowUpRight, CodeXml } from 'lucide-react'

const WORK_CARDS = [
  {
    title: 'Kafka Docker',
    detail: 'An event-driven architecture built with Ruby on Rails, Kafka, Postgres, and Docker.',
    imageSrc: '/kafka-docker.jpg',
    caption: 'Kafka Docker'
  },
  {
    title: 'Password Recovery',
    detail: 'A personal password-strength and recovery tool for applications I build and maintain.',
    imageSrc: '/password-recovery.png',
    caption: 'Password Recovery'
  },
  {
    title: 'Debughub',
    detail: 'A VS Code extension for managing debuggers easily while keeping development workflows focused.',
    imageSrc: '/debughub.png',
    caption: 'Debughub'
  }
] as const

export default function Work() {
  return (
    <section
      id='work'
      className='w-full bg-[#1b1a1a] px-6 py-20 text-white sm:px-10 sm:py-28'
    >
      <div className='mx-auto w-full max-w-275'>
        <div className='max-w-3xl'>
          <p className='mb-4 text-sm font-medium tracking-[0.18em] text-[#a208ea] uppercase'>Selected work</p>
          <h2 className='text-[2rem] leading-tight font-medium tracking-tight sm:text-[2.8rem]'>Featured Work</h2>
          <p className='mt-5 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl'>
            A curated selection of problems I have solved for myself and others, showing engineering thinking, creative
            problem-solving, and attention to detail across various industries. Unfortunately, I can&rsquo;t show many
            of them under NDA.
          </p>
          <a
            href='https://github.com/JCassio1'
            target='_blank'
            rel='noreferrer'
            aria-label='Visit JCassio1 on GitHub'
            className='focus-ring group mt-7 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15'
          >
            <CodeXml
              className='h-4 w-4'
              aria-hidden='true'
            />
            GitHub
            <ArrowUpRight
              className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5'
              aria-hidden='true'
            />
          </a>
        </div>

        <div className='mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6'>
          {WORK_CARDS.map(({ title, detail, imageSrc, caption }) => (
            <article
              key={title}
              className='flex flex-col gap-5'
            >
              <div className='rounded-2xl border border-white/20 bg-white/3 p-2 shadow-[0_0_0_1px_rgb(255_255_255/0.04)]'>
                <TiltedCard
                  imageSrc={imageSrc}
                  altText={title}
                  captionText={caption}
                  containerHeight='clamp(260px, 28vw, 340px)'
                  imageHeight='clamp(220px, 24vw, 300px)'
                  imageWidth='100%'
                  showMobileWarning={false}
                  displayOverlayContent
                />
              </div>
              <div>
                <h3 className='text-xl font-medium text-white'>{title}</h3>
                <p className='mt-2 text-base leading-relaxed text-white/60'>{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
