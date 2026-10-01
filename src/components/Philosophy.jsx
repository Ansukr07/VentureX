import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import billImg   from '../assets/bill-1.webp'
import doodle4   from '../assets/doodle-4.mp4'
import doodle5   from '../assets/doodle-5.mp4'
import './Philosophy.css'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.16, 1, 0.3, 1]

export default function Philosophy() {
  const sectionRef = useRef(null)
  const dollarRef  = useRef(null)
  const textRefs = useRef([])
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

      const textEls = gsap.utils.toArray('.phil-text')
      gsap.set(textEls, { color: '#BDBDBD', opacity: 0.92 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.phil-body',
        pinSpacing: true,
        scrub: 1.2,
      })

      textEls.forEach((el, index) => {
        gsap.fromTo(
          el,
          { color: '#BDBDBD', opacity: 0.55, y: 16 },
          {
            color: '#0A0A0A',
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 78%',
              end: 'bottom 38%',
              scrub: true,
            },
          }
        )

        gsap.to(el, {
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: true,
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="intro" className="philosophy" ref={sectionRef}>
      <div className="phil-meta">
        <span className="phil-meta-item">Venture X.</span>
        <span className="phil-meta-item phil-meta-center">The Principles of Wealth.</span>
        <span className="phil-meta-item phil-meta-date">October 1, 2026, 9:26 AM</span>
        <span className="phil-meta-item phil-meta-right">Boston, MA</span>
      </div>

      <div className="phil-body">
        <p
          className="phil-text"
          ref={(el) => {
            if (el) textRefs.current[0] = el
          }}
        >
          Every great startup begins with an idea, but turning that idea into a successful venture requires vision, execution, resilience, and the right opportunities. VentureX is a national platform where ambitious founders, emerging startups, and innovators come together to showcase their ventures, validate their ideas, and connect with the people who can help them grow.
        </p>

        <p
          className="phil-text phil-text--secondary"
          ref={(el) => {
            if (el) textRefs.current[1] = el
          }}
        >
          Through a rigorous evaluation process, the most promising ventures earn the opportunity to pitch directly before investors, mentors, and industry leaders. More than just a pitching event, VentureX is a gateway to funding, mentorship, strategic partnerships, and the connections that transform startups into scalable businesses.
        </p>
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
