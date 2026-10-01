import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import horseImg from '../assets/horse.webp'
import bill1 from '../assets/bill-1.webp'
import doodle1 from '../assets/doodle-1.mp4'
import doodle2 from '../assets/doodle-2.mp4'
import doodle3 from '../assets/doodle-3.mp4'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const annotations = [
  { text: 'e4', top: '14%', left: '16%' },
  { text: 'e5', top: '22%', left: '26%' },
  { text: 'Nf3', top: '34%', left: '38%' },
  { text: 'Nc6', top: '29%', right: '35%' },
  { text: 'Bc4', top: '48%', right: '31%' },
  { text: 'Bc5', top: '44%', right: '18%' },
  { text: 'c3', top: '65%', left: '33%' },
  { text: 'Nf6', top: '72%', left: '40%' },
  { text: 'd3', top: '73%', right: '36%' },
  { text: 'd6', top: '89%', left: '32%' },
  { text: 'O-O', top: '93%', right: '31%' },
]

const EASE = [0.16, 1, 0.3, 1]

const letterVar = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 1.0, delay: 0.08 + i * 0.05, ease: EASE },
  }),
}

const fadeUpVar = {
  hidden: { opacity: 0, y: 32 },
  visible: (d) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: d, ease: EASE },
  }),
}

const doodleVideos = [
  { src: doodle2, style: { top: '8%', left: '2%', width: '120px', opacity: 0.7 } },
  { src: doodle2, style: { top: '55%', right: '3%', width: '100px', opacity: 0.65 } },
  { src: doodle3, style: { bottom: '10%', left: '5%', width: '90px', opacity: 0.6 } },
]

export default function Hero() {
  const heroRef = useRef(null)
  const knightRef = useRef(null)
  const { scrollY } = useScroll()

  const annotY = useTransform(scrollY, [0, 600], [0, -40])
  const knightY = useTransform(scrollY, [0, 600], [0, -60])
  const knightScale = useTransform(scrollY, [0, 600], [1, 1.06])

  /* Mouse parallax on knight */
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const onMove = (e) => {
      const { clientX, clientY } = e
      const { width, height, left, top } = hero.getBoundingClientRect()
      const x = ((clientX - left) / width - 0.5) * 18
      const y = ((clientY - top) / height - 0.5) * -22
      gsap.to(knightRef.current, { x, y, duration: 0.6, ease: 'power2.out' })
    }
    const onLeave = () => gsap.to(knightRef.current, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' })
    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  /* GSAP: subtle section exit */
  useEffect(() => {
    gsap.to(heroRef.current, {
      opacity: 0.4,
      scale: 0.97,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'bottom 80%',
        end: 'bottom 20%',
        scrub: 1.5,
      },
    })
  }, [])

  const ventureLetters = ['V', 'E', 'N', 'T', 'U', 'R', 'E']

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Floating doodle videos */}
      {doodleVideos.map((d, i) => (
        <motion.video
          key={i}
          className="hero-doodle"
          style={d.style}
          src={d.src}
          autoPlay
          muted
          loop
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: d.style.opacity ?? 0.65 }}
          transition={{ duration: 1.2, delay: 1.0 + i * 0.15 }}
        />
      ))}

      {/* Floating dollar bill bottom-left */}
      <motion.div
        className="hero-floating-bill"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.88, y: 0 }}
        transition={{ duration: 1.4, delay: 1.4 }}
      >
        <img src={bill1} alt="Dollar bill" className="hero-bill-img" />
      </motion.div>

      {/* Floating chess annotations with parallax */}
      <motion.div className="hero-annotations" style={{ y: annotY }}>
        {annotations.map((a, i) => (
          <motion.span
            key={i}
            className="chess-annotation"
            style={{ top: a.top, left: a.left, right: a.right }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 1, delay: 1.2 + i * 0.08, ease: 'easeOut' }}
          >
            {a.text}
          </motion.span>
        ))}
      </motion.div>

      <div className="hero-inner">
        {/* Tagline */}
        <motion.p
          className="hero-tagline"
          variants={fadeUpVar}
          custom={0.2}
          initial="hidden"
          animate="visible"
        >
          Pitch. Connect. Grow.
        </motion.p>

        {/* Title: VENTURE X with Centered Horse */}
        <div className="hero-title-wrap">
          {/* Row 1: VENTURE */}
          <div className="hero-title-row hero-row-venture">
            {ventureLetters.map((l, i) => (
              <div key={i} className="hero-letter-wrap">
                <motion.span
                  className="hero-letter"
                  variants={letterVar}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                >
                  {l}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Row 2: X */}
          <div className="hero-title-row hero-row-x">
            <div className="hero-letter-wrap">
              <motion.span
                className="hero-letter hero-letter--x"
                variants={letterVar}
                custom={7}
                initial="hidden"
                animate="visible"
              >
                X
              </motion.span>
            </div>
          </div>

          {/* Centered Majestic Horse piece */}
          <motion.div
            className="hero-knight-wrap"
            ref={knightRef}
            style={{ y: knightY, scale: knightScale }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
          >
            <img
              src={horseImg}
              alt="Chess knight piece"
              className="hero-knight"
            />
          </motion.div>
        </div>

        {/* Author */}
        <motion.p
          className="hero-author"
          variants={fadeUpVar}
          custom={0.85}
          initial="hidden"
          animate="visible"
        >
          An Initiative by E-Cell, BMSIT&amp;M
        </motion.p>

        {/* Mouse Scroll Doodle */}
        <motion.div
          className="hero-scroll-mouse"
          variants={fadeUpVar}
          custom={1.0}
          initial="hidden"
          animate="visible"
        >
          <div className="scroll-mouse-wrap">
            <span className="mouse-char char-s">s</span>
            <span className="mouse-char char-c">c</span>
            <span className="mouse-char char-r">r</span>
            <span className="mouse-char char-o">o</span>
            <span className="mouse-char char-l1">l</span>
            <span className="mouse-char char-l2">l</span>
            <div className="mouse-body">
              <div className="mouse-wheel"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator (right-edge vertical N/S) */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <span>N</span>
        <div className="scroll-line"></div>
        <span>S</span>
      </motion.div>
    </section>
  )
}
