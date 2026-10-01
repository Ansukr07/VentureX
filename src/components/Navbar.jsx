import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import coinImg from '../assets/coin.webp'
import './Navbar.css'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState('En')
  const [langOpen, setLangOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      ref={navRef}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar-left">
        <motion.a
          href="#hero"
          className="navbar-brand"
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.2 }}
        >
          <span className="brand-title">Venture X</span>
          <span className="brand-edition">2026 Edition</span>
        </motion.a>
      </div>

      <div className="navbar-center">
        {['Intro', 'The book', 'About the Author'].map((label, i) => (
          <motion.a
            key={label}
            href={`#${label === 'Intro' ? 'intro' : label === 'The book' ? 'book' : 'author'}`}
            className="nav-link"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ color: 'var(--green)' }}
          >
            {label}
          </motion.a>
        ))}
      </div>

      <div className="navbar-right">
        <motion.div
          className="lang-toggle"
          onClick={() => setLangOpen(!langOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
        >
          <span>{lang}</span>
          <span className="lang-caret">∨</span>
          {langOpen && (
            <motion.div
              className="lang-dropdown"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div onClick={() => { setLang('En'); setLangOpen(false) }}>English</div>
              <div onClick={() => { setLang('Es'); setLangOpen(false) }}>Español</div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="nav-coin-wrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        >
          <img src={coinImg} alt="Roman coin" className="nav-coin-img" />
        </motion.div>

        <motion.a
          href="https://www.amazon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-buy-btn"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="buy-title">Buy it now!</span> <span className="price">$9.99</span>
        </motion.a>
      </div>
    </motion.nav>
  )
}
