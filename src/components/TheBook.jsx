import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bookCoverImg from '../assets/book-cover-EN.webp'
import bookFullImg  from '../assets/book-1-EN.png'
import doodle6      from '../assets/doodle-6.mp4'
import './TheBook.css'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.16, 1, 0.3, 1]

const formats = [
  { name: 'Paperback',    price: '$15.99' },
  { name: 'Hardcover',   price: '$22.99' },
  { name: 'Kindle Edition', price: '$9.99' },
  { name: 'Audiobook',   price: 'Soon'   },
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
        <p className="book-label">The Book</p>
        <p className="book-sublabel">5 Languages. 3 Formats. One Story.</p>
      </motion.div>

      {/* Visual area with scroll-zoom */}
      <div className="book-visual-area" ref={visualRef}>
        {/* Real book cover image */}
        <motion.img
          src={bookFullImg}
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
              <tr><th>Format</th><th>Price (USD)</th></tr>
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
            Buy on Amazon
          </motion.a>
          <p className="book-kindle-note">(*) Free with a Kindle Unlimited membership</p>
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
            Not a finance textbook.<br />
            Not just a novel.<br />
            A story that teaches you how<br />
            money really works.
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
                    <em>Oliver Harper</em> arrives at Harvard on a scholarship, with an outsized
                    ambition and the feeling that he is entering a world that was not designed
                    for him. He comes from a family where money was always tight, financial
                    mistakes came at a high price, and hope weighed as heavily as the bills.
                  </p>
                  <br />
                  <p>
                    Having learned to see the world through the logic of a chessboard,
                    Oliver soon discovers that money, like chess, has invisible rules:{' '}
                    <em>the winner is not the one who appears wealthiest or moves fastest,
                    but the one who understands the position before making the next move.</em>
                  </p>
                  <br />
                  <p>
                    Venture X is a story about wealth, ambition, family, and freedom.
                    It is not a manual, but a game played over the course of a lifetime: the
                    story of a young man who learns, move by move, to stop merely surviving
                    and start building a life of his own.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Set against the backdrop of Harvard's elite social circles, Oliver must
                    navigate a world where the unwritten rules of money and power are never
                    spoken aloud but always enforced.
                  </p>
                  <br />
                  <p>
                    From a cramped apartment in his hometown to the highest-stakes decisions
                    of his career, Oliver's journey is a master class in the invisible
                    architecture of financial freedom — one move, one lesson, one sacrifice
                    at a time.
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
            <p className="book-email-title">Read and listen to Chapter 1 for free</p>
            {submitted ? (
              <motion.p
                className="book-email-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                ✓ Check your inbox! Chapter 1 is on its way.
              </motion.p>
            ) : (
              <form className="book-email-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Your email"
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
                  Send
                </motion.button>
              </form>
            )}
            <p className="book-email-note">
              (*) By subscribing, you agree to receive occasional updates about the book.
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
