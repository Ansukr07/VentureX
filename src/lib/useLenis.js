import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

export function getLenis() {
  return lenis
}

export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.8,
      infinite: false,
    })

    // Wire Lenis into GSAP's RAF so ScrollTrigger stays in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // ScrollTrigger must use Lenis's scroll position
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      lenis = null
      gsap.ticker.remove((time) => lenis?.raf(time * 1000))
    }
  }, [])
}
