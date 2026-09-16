import EvilEye from '@/components/EvilEye'

export default function Funny() {
  return (
    <section
      id='funny'
      className='w-full px-6 py-20 sm:px-10 sm:py-28'
    >
      <div className='mx-auto w-full max-w-275'>
        <div className='rounded-4xl border border-foreground/10 bg-[#120f18] p-6 sm:p-10'>
          <p className='text-sm font-medium tracking-[0.18em] text-[#a208ea] uppercase'>Fun warning</p>
          <h2 className='mt-4 text-[1.8rem] leading-tight font-medium tracking-tight text-white sm:text-[2.5rem]'>
            If you don&rsquo;t attempt to interact,
          </h2>
          <p className='mt-2 text-[1.3rem] leading-tight font-medium tracking-tight text-white/85 sm:text-[1.7rem]'>
            my dragon will put a curse on you.
          </p>
          <p className='mt-4 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg'>
            Hover the eye. It tracks your cursor and judges your curiosity.
          </p>

          <div className='mt-8 h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-black/55 sm:h-[340px]'>
            <EvilEye
              eyeColor='#ff5f2e'
              intensity={1.55}
              pupilSize={0.7}
              pupilFollow={1.15}
              glowIntensity={0.42}
              flameSpeed={1.1}
              backgroundColor='#050505'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
