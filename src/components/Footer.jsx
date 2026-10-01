import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import footerVideo from '../assets/footer.mp4'
import billImg2    from '../assets/bill-2.webp'
import './Footer.css'

const EASE = [0.16, 1, 0.3, 1]

const linkVar = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: EASE },
  }),
}

export default function Footer() {
  const footerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ['start end', 'end end'] })
  const dollarY   = useTransform(scrollYProgress, [0, 1], [60, -20])
  const dollarRot = useTransform(scrollYProgress, [0, 1], [-30, -15])

  const navLinks = ['The Book', 'About the Author', 'Buy Now']
  const socials  = ['Linkedin', 'Instagram', 'Twitter']
  const hrefs    = ['#book', '#author', 'https://www.amazon.com']
  const sHrefs   = ['https://linkedin.com', 'https://instagram.com', 'https://twitter.com']

  return (
    <motion.footer
      className="footer"
      ref={footerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* Footer background video */}
      <video
        className="footer-bg-video"
        src={footerVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Chess annotations */}
      {[
        { text: 'b3',  style: { top: '18%', left: '20%' } },
        { text: 'Nd4', style: { bottom: '25%', left: '55%' } },
        { text: 'Nb5', style: { top: '28%', right: '12%' } },
      ].map(({ text, style }, i) => (
        <motion.span
          key={i}
          className="chess-annotation"
          style={style}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.12 }}
        >
          {text}
        </motion.span>
      ))}

      <div className="footer-inner">
        {/* Col 1 — brand + nav */}
        <motion.div
          className="footer-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="footer-brand">Venture X.</p>
          <nav className="footer-nav">
            {navLinks.map((label, i) => (
              <motion.a
                key={label}
                href={hrefs[i]}
                className={`footer-link${label === 'Buy Now' ? '' : ''}`}
                target={label === 'Buy Now' ? '_blank' : undefined}
                rel={label === 'Buy Now' ? 'noopener noreferrer' : undefined}
                variants={linkVar}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ x: 4, color: 'var(--green)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href="mailto:hello@moneyincheck.org"
              className="footer-link footer-link--handwritten"
              variants={linkVar}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ x: 4, color: 'var(--green)' }}
            >
              say hello <span>✌</span>
            </motion.a>
          </nav>
        </motion.div>

        {/* Col 2 — floating dollar (parallax) */}
        <motion.div
          className="footer-dollar-col"
          style={{ y: dollarY, rotate: dollarRot }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <img src={billImg2} alt="dollar bill" className="footer-dollar" />
        </motion.div>

        {/* Col 3 — copyright */}
        <motion.div
          className="footer-col footer-col--center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <p className="footer-copy">© 2026 Óscar Pérez. All rights reserved.</p>
        </motion.div>

        {/* Col 4 — dev credit */}
        <motion.div
          className="footer-col footer-col--center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        >
          <p className="footer-dev">
            <em>Site developed by </em>
            <a href="https://cloudstudio.io" target="_blank" rel="noopener noreferrer" className="footer-dev-link">
              cloudstudio
              <span className="footer-dev-underline"></span>
            </a>
          </p>
        </motion.div>

        {/* Col 5 — social */}
        <motion.div
          className="footer-col footer-col--right"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.06, ease: EASE }}
        >
          <p className="footer-social-title">Follow the author</p>
          <nav className="footer-social">
            {socials.map((label, i) => (
              <motion.a
                key={label}
                href={sHrefs[i]}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                variants={linkVar}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ x: -4, color: 'var(--green)' }}
              >
                {label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      </div>
    </motion.footer>
  )
}
