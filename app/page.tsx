import Navbar from '@/components/Navbar'
import Landing from '@/components/sections/Landing'
import Solvables from '@/components/sections/Solvables'
import Work from '@/components/sections/Work'
import Experience from '@/components/sections/Experience'
import Funny from '@/components/sections/Funny'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <Landing />
      <Solvables />
      <Work />
      <Experience />
      <Funny />
      <Contact />
    </>
  )
}
