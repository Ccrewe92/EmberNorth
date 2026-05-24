import ENIntro from '@/components/ENIntro'
import ScrollProgress from '@/components/ScrollProgress'
import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/Marquee'
import Problem from '@/components/sections/Problem'
import TheWay from '@/components/sections/TheWay'
import Portfolio from '@/components/sections/Portfolio'
import Pricing from '@/components/sections/Pricing'
import About from '@/components/sections/About'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <ENIntro />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <TheWay />
        <Portfolio />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
