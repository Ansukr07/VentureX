import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Magnetic custom cursor — only active inside the hero section.
 * Uses two elements: a trailing ring and a dot that snaps instantly.
 */
export default function HeroCursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ring = ringRef.current
    const dot  = dotRef.current
    let visible = false

    const onMove = (e) => {
      if (!visible) {
        gsap.to([ring, dot], { opacity: 1, duration: 0.3 })
        visible = true
      }
      // Dot snaps instantly
      gsap.set(dot, { x: e.clientX - 2, y: e.clientY - 2 })
      // Ring lags behind
      gsap.to(ring, {
        x: e.clientX - 6,
        y: e.clientY - 6,
        duration: 0.5,
        ease: 'power3.out',
      })
    }

    const onLeave = () => {
      gsap.to([ring, dot], { opacity: 0, duration: 0.3 })
      visible = false
    }

    const hero = document.getElementById('hero')
    if (hero) {
      hero.addEventListener('mousemove', onMove)
      hero.addEventListener('mouseleave', onLeave)
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', onMove)
        hero.removeEventListener('mouseleave', onLeave)
      }
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        className="hero-cursor"
        style={{ opacity: 0, position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998 }}
      />
      <div
        ref={dotRef}
        className="hero-cursor-dot"
        style={{ opacity: 0, position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
      />
    </>
  )
}
