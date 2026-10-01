import { useState } from 'react'
import { useLenis } from './lib/useLenis'
import ScrollProgress from './components/ScrollProgress'
import HeroCursor from './components/HeroCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import TheBook from './components/TheBook'
import Author from './components/Author'
import QuoteBanner from './components/QuoteBanner'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis()

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <ScrollProgress />
          <HeroCursor />
          <Navbar />
          <main>
            <Hero />
            <Philosophy />
            <TheBook />
            <Author />
            <QuoteBanner />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
