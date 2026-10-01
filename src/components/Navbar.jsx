import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
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
        {['Intro', 'The Event'].map((label, i) => (
          <motion.a
            key={label}
            href={`#${label === 'Intro' ? 'intro' : 'book'}`}
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
    </motion.nav>
  )
}
