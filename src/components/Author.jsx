import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import authorImg    from '../assets/author-images-1.webp'
import signatureImg from '../assets/signature.webp'
import bookCoverImg from '../assets/book-cover-EN.webp'
import './Author.css'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.16, 1, 0.3, 1]

const cardVar = {
  hidden:  { opacity: 0, y: 40, scale: 0.92 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.75, delay: i * 0.12, ease: EASE },
  }),
}

export default function Author() {
  const sectionRef = useRef(null)
  const bioRef     = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  /* GSAP: bio text reveals word by word */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.author-bio-text',
        { opacity: 0.15 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: '.author-bio-text',
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1.5,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="author" className="author-section" ref={sectionRef}>
      {/* Chess annotations */}
      {[
        { text: 'Ra8', style: { top: '12%', left: '5%' } },
        { text: 'Rc8', style: { top: '40%', right: '5%' } },
        { text: 'Ra8', style: { bottom: '15%', right: '18%' } },
      ].map(({ text, style }, i) => (
        <motion.span
          key={i}
          className="chess-annotation"
          style={style}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
        >
          {text}
        </motion.span>
      ))}

      <div className="author-body visible">
        {/* Left: book cards */}
        <motion.div
          className="author-books"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.0, ease: EASE }}
        >
          {/* Book 1 */}
          <motion.div
            className="author-book-card"
            style={{ top: '8%', left: '5%' }}
            variants={cardVar}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -8, rotate: -2, boxShadow: '0 20px 50px rgba(0,0,0,0.18)' }}
          >
            <div className="book-cover book-cover--blue"><span>HOT NOW</span></div>
            <p className="author-book-title">Hot Right Now, Coauthor.</p>
            <p className="author-book-date">2017–2022</p>
          </motion.div>

          {/* Book 2 */}
          <motion.div
            className="author-book-card"
            style={{ top: '8%', right: '5%' }}
            variants={cardVar}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -8, rotate: 2, boxShadow: '0 20px 50px rgba(0,0,0,0.18)' }}
          >
            <img src={bookCoverImg} alt="Venture X" className="author-book-img" />
            <p className="author-book-title">Venture X</p>
            <p className="author-book-date">2026</p>
          </motion.div>

          {/* Author photo card */}
          <motion.div
            className="author-conf-card"
            variants={cardVar}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.04, boxShadow: '0 16px 40px rgba(0,0,0,0.2)' }}
          >
            <div className="author-conf-img">
              <img src={authorImg} alt="Óscar Pérez" className="conf-img" />
            </div>
            <p className="author-book-title">Óscar Pérez</p>
            <p className="author-book-date">Author</p>
          </motion.div>
        </motion.div>

        {/* Right: bio */}
        <div className="author-bio" ref={bioRef}>
          <p className="author-bio-text">
            Óscar is someone who, for decades, sought an edge — not through nepotism,
            prestige or connections:{' '}
            <em>a firsthand understanding of how those who truly grasp the rules of money,
            success, and personal freedom think and make decisions</em>, and of what
            separates lasting wealth from its mere appearance.
          </p>

          <motion.div
            className="author-signature-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            <div className="author-signature">
              <img src={signatureImg} alt="Óscar Pérez signature" className="signature-img" />
            </div>
            <p className="author-name">ÓSCAR PÉREZ</p>
            <p className="author-role">Founder &amp; Former CEO of Awwwards</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
