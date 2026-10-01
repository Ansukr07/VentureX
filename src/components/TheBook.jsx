import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bookCoverImg from '../assets/book-cover-EN.webp'
import ventureXBook from '../assets/image.png'
import doodle6      from '../assets/doodle-6.mp4'
import './TheBook.css'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.16, 1, 0.3, 1]

const formats = [
  { name: 'Startup & Investor Pitching', price: '—' },
  { name: 'National-Level Event', price: '—' },
  { name: 'Organized by E-Cell, BMSIT&M', price: '—' },
  { name: 'Top 30 Ventures Selected', price: '—' },
]

const rowVar = {
  hidden:  { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: EASE },
  }),
}

const storyVariants = {
  enter: { opacity: 0, x: 30  },
  center:{ opacity: 1, x: 0,  transition: { duration: 0.55, ease: EASE } },
  exit:  { opacity: 0, x: -30, transition: { duration: 0.35, ease: [0.43,0.13,0.23,0.96] } },
}

export default function TheBook() {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [slide, setSlide]       = useState(0)
  const sectionRef = useRef(null)
  const visualRef  = useRef(null)

  /* GSAP: visual area does a slow zoom while scrolling past */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        visualRef.current,
        { scale: 1.0 },
        {
          scale: 1.12,
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section id="book" className="book-section" ref={sectionRef}>
      {/* Header */}
      <motion.div
        className="book-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="book-label">The Event</p>
        <p className="book-sublabel">30 Startups. Investors. One Opportunity.</p>
      </motion.div>

      {/* Visual area with scroll-zoom */}
      <div className="book-visual-area" ref={visualRef}>
        {/* Real book cover image */}
        <motion.img
          src={ventureXBook}
          alt="Venture X book cover"
          className="book-visual-img"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: EASE }}
        />
        {/* Doodle overlay */}
        <motion.video
          className="book-doodle"
          src={doodle6}
          autoPlay muted loop playsInline
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.span
          className="chess-annotation"
          style={{ top: '20%', left: '35%' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Ra8
        </motion.span>
        <motion.span
          className="chess-annotation"
          style={{ bottom: '15%', right: '30%' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Nc4
        </motion.span>
      </div>

      {/* Bottom two-column layout */}
      <div className="book-bottom visible">
        {/* Left column */}
        <motion.div
          className="book-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <table className="book-table">
            <thead>
              <tr><th>CATEGORY</th><th>DETAILS</th></tr>
            </thead>
            <tbody>
              {formats.map((f, i) => (
                <motion.tr
                  key={i}
                  variants={rowVar}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <td>{f.name}</td>
                  <td className={f.price === 'Soon' ? 'soon' : ''}>{f.price}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          <motion.a
            href="https://www.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amazon"
            whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(15,123,95,0.35)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            Apply for VentureX
          </motion.a>
          <p className="book-kindle-note">Applications open for startups across India.</p>
        </motion.div>

        {/* Right column */}
        <motion.div
          className="book-right"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          {/* Slide nav */}
          <div className="book-story-nav">
            {[0, 1].map((n) => (
              <motion.button
                key={n}
                className={`story-btn ${slide === n ? 'active' : ''}`}
                onClick={() => setSlide(n)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
              >
                {n + 1}
              </motion.button>
            ))}
          </div>

          <h2 className="book-tagline">
            Ideas deserve more than attention.<br />
            They deserve opportunity.
          </h2>

          {/* Animated slide switch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              className="book-story-text"
              variants={storyVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {slide === 0 ? (
                <>
                  <p>
                    VentureX is a national-level startup and investor pitching platform organized
                    by E-Cell, BMSIT&amp;M. It brings together ambitious founders, emerging
                    startups, investors, mentors, and ecosystem leaders on a single stage designed
                    to accelerate innovation and growth.
                  </p>
                  <br />
                  <p>
                    Every startup begins with an idea, but transforming that idea into a
                    successful venture requires validation, guidance, funding, and meaningful
                    connections. VentureX provides founders with the opportunity to showcase their
                    ventures, gain valuable feedback, and connect directly with investors and
                    industry experts.
                  </p>
                  <br />
                  <p>
                    Through a rigorous evaluation process, the most promising startups earn the
                    opportunity to pitch before investors, build strategic partnerships, access
                    mentorship, and unlock pathways for long-term growth.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    VentureX is built to help founders move from concept to traction — turning
                    early potential into real market momentum, strategic partnerships, and investor
                    confidence.
                  </p>
                  <br />
                  <p>
                    By creating a focused environment for discovery, evaluation, and connection,
                    the platform helps emerging companies access the resources they need to scale
                    with clarity and purpose.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Email capture */}
          <motion.div
            className="book-email-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            <p className="book-email-title">Register for VentureX</p>
            {submitted ? (
              <motion.p
                className="book-email-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                ✓ Registration successful. We’ll be in touch.
              </motion.p>
            ) : (
              <form className="book-email-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="book-email-input"
                  required
                />
                <motion.button
                  type="submit"
                  className="btn-send"
                  whileHover={{ scale: 1.04, backgroundColor: 'var(--green)' }}
                  whileTap={{ scale: 0.96 }}
                >
                  Register Now
                </motion.button>
              </form>
            )}
            <p className="book-email-note">
              Applications are subject to eligibility and evaluation criteria.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.span
        className="chess-annotation"
        style={{ top: '8%', right: '12%' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.55 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Bb5
      </motion.span>
    </section>
  )
}
