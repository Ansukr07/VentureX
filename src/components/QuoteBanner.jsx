import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import billImg2      from '../assets/bill-2.webp'
import './QuoteBanner.css'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.16, 1, 0.3, 1]

const lines = [
  { text: 'Chess, ',    highlight: false },
  { text: 'life,',     highlight: true  },
  { text: ' and finance', highlight: false },
]

const headlineVar = {
  hidden:  { y: '105%', opacity: 0 },
  visible: (i) => ({
    y: '0%', opacity: 1,
    transition: { duration: 1.05, delay: i * 0.13, ease: EASE },
  }),
}

const ghostVar = {
  hidden:  { opacity: 0 },
  visible: (i) => ({
    opacity: 0.22,
    transition: { duration: 1.1, delay: 0.4 + i * 0.14, ease: 'easeOut' },
  }),
}

export default function QuoteBanner() {
  const sectionRef   = useRef(null)
  const charRef      = useRef(null)
  const dollarRef    = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  /* Parallax layers */
  const charY    = useTransform(scrollYProgress, [0, 1], [60,  -40])
  const dollarY  = useTransform(scrollYProgress, [0, 1], [80,  -80])
  const dollarRot = useTransform(scrollYProgress, [0, 1], [-20, -5])
  const dollarX  = useTransform(scrollYProgress, [0, 1], [-20,  20])

  /* GSAP: characters strip scrolls in horizontally as you scroll down */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        charRef.current,
        { x: '8%', opacity: 0 },
        {
          x: '0%', opacity: 1,
          scrollTrigger: {
            trigger: charRef.current,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1.8,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="quote-section" ref={sectionRef}>
      {/* Chess annotations */}
      {[
        { text: 'Bc6',  style: { top: '10%', left: '12%' } },
        { text: 'Bc3',  style: { top: '10%', right: '10%' } },
        { text: 'Nf8',  style: { bottom: '18%', right: '8%' } },
        { text: 'Nc4',  style: { bottom: '30%', left: '30%' } },
        { text: 'Nd4',  style: { bottom: '8%',  left: '55%' } },
        { text: 'Rc8',  style: { top: '40%', right: '3%' } },
        { text: 'Rc8',  style: { top: '55%', left: '3%' } },
      ].map(({ text, style }, i) => (
        <motion.span
          key={i}
          className="chess-annotation"
          style={style}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.08 }}
        >
          {text}
        </motion.span>
      ))}

      {/* ── Quote headline ─── */}
      <div className="quote-text-wrap visible">
        {/* Line 1: "Chess, life, and finance" */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h2
            className="quote-headline"
            variants={headlineVar}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Chess,{' '}
            <span className="quote-highlight">life,</span>
            {' '}and finance
          </motion.h2>
        </div>

        {/* Line 2 */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h2
            className="quote-headline"
            variants={headlineVar}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            share one truth —
          </motion.h2>
        </div>

        {/* Ghost lines */}
        {[
          'every move matters',
          'when you understand',
          'the rules.',
        ].map((line, i) => (
          <motion.h2
            key={line}
            className={`quote-headline quote-headline--ghost${i === 2 ? ' quote-headline--last' : ''}`}
            variants={ghostVar}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {line}
          </motion.h2>
        ))}
      </div>

      {/* ── Character lineup — scrub horizontal entry ── */}
      <motion.div
        className="quote-characters"
        ref={charRef}
        style={{ y: charY }}
      >
        <motion.img
          src="/characters.jpg"
          alt="Characters from Venture X"
          className="characters-img"
          initial={{ opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease: EASE }}
          whileHover={{ scale: 1.015 }}
        />
      </motion.div>

      {/* ── Floating dollar — multi-axis parallax ── */}
      <motion.div
        className="quote-dollar-wrap"
        style={{ y: dollarY, rotate: dollarRot, x: dollarX }}
      >
        <img src={billImg2} alt="dollar bill" className="quote-dollar" />
      </motion.div>
    </section>
  )
}
