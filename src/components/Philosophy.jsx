import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import coinImg   from '../assets/coin.webp'
import billImg   from '../assets/bill-1.webp'
import doodle4   from '../assets/doodle-4.mp4'
import doodle5   from '../assets/doodle-5.mp4'
import './Philosophy.css'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.16, 1, 0.3, 1]

const textLine = {
  hidden:  { opacity: 0, y: 52 },
  visible: (d) => ({
    opacity: 1, y: 0,
    transition: { duration: 1.1, delay: d, ease: EASE },
  }),
}

const metaItem = {
  hidden:  { opacity: 0, y: 8 },
  visible: (d) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Philosophy() {
  const sectionRef = useRef(null)
  const dollarRef  = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  /* Parallax: dollar bill drifts at a different rate than text */
  const dollarY  = useTransform(scrollYProgress, [0, 1], [80, -80])
  const dollarRot = useTransform(scrollYProgress, [0, 1], [-8, -18])

  /* GSAP: subtle background grid shift on scroll */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.phil-body', { backgroundPositionY: '0%' }, {
        backgroundPositionY: '100%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="intro" className="philosophy" ref={sectionRef}>
      {/* Meta bar — staggered fade */}
      <motion.div
        className="phil-meta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {[
          { el: <span className="phil-meta-item">Venture X.</span>, d: 0 },
          { el: <span className="phil-meta-item phil-meta-center">The Principles of Wealth.</span>, d: 0.08 },
          { el: <span className="phil-meta-item phil-meta-date">October 1, 2026, 9:26 AM</span>, d: 0.16 },
          {
            el: (
              <span className="phil-meta-item phil-meta-right">
                <motion.img
                  src={coinImg}
                  alt="coin"
                  className="phil-coin"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                Boston, MA
              </span>
            ),
            d: 0.24,
          },
        ].map(({ el, d }, i) => (
          <motion.div key={i} variants={metaItem} custom={d}>{el}</motion.div>
        ))}
      </motion.div>

      {/* Large paragraphs — each line fades up */}
      <div className="phil-body">
        <motion.p
          className="phil-text"
          variants={textLine}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Most people enter{' '}
          <span className="phil-inline-icon">♟</span>
          {' '}adulthood as if they were sitting down at a chessboard for the
          first time, without knowing{' '}
          <span className="phil-inline-icon">♞</span>
          {' '}the rules, without recognizing which pieces truly matter, and
          believing that hard work alone will be enough to stay{' '}
          <span className="phil-inline-icon">♝</span>
          {' '}in the game.
        </motion.p>

        <motion.p
          className="phil-text phil-text--secondary"
          variants={textLine}
          custom={0.12}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          But money has its own logic, its own{' '}
          <span className="phil-inline-icon">♟</span>
          {' '}traps, its punishments, and its rewards. Venture X is the
          story of a game learned the hard way, and an invitation to discover
          that true financial{' '}
          <span className="phil-inline-icon">🚲</span>
          {' '}freedom is not about having more, but about living with margin
          and dignity, and being able to choose the life you truly want without
          fear.
        </motion.p>
      </div>

      {/* Floating dollar — parallax + float */}
      <motion.div
        className="phil-dollar-wrap"
        style={{ y: dollarY, rotate: dollarRot }}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <img ref={dollarRef} src={billImg} alt="dollar bill" className="phil-dollar" />
      </motion.div>

      {/* Chess annotations */}
      {[
        { text: 'Bd3', style: { top: '15%', left: '5%' } },
        { text: 'Bb5', style: { top: '35%', left: '45%' } },
        { text: 'cd4', style: { top: '55%', left: '18%' } },
        { text: 'Bb4', style: { top: '25%', right: '8%' } },
        { text: 'Nd7', style: { top: '70%', right: '20%' } },
        { text: 'c5',  style: { bottom: '18%', left: '38%' } },
      ].map(({ text, style }, i) => (
        <motion.span
          key={text}
          className="chess-annotation"
          style={style}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.07 }}
        >
          {text}
        </motion.span>
      ))}

      {/* Floating doodle videos */}
      <motion.video
        className="phil-doodle phil-doodle--tl"
        src={doodle4}
        autoPlay muted loop playsInline
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.video
        className="phil-doodle phil-doodle--br"
        src={doodle5}
        autoPlay muted loop playsInline
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.55 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </section>
  )
}
