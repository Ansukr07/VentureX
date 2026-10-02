import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import image26 from '../assets/image26.jpg'
import image37 from '../assets/image37.jpg'
import image43 from '../assets/image43.JPG'
import './Navbar.css'

const menuItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About VentureX', href: '#intro' },
  { label: 'Event Flow', href: '#book' },
  { label: 'Investors', href: '#book' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-active' : ''}`}
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar-left">
          <motion.a
            href="#hero"
            className="navbar-brand"
            onClick={closeMenu}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <span className="brand-title">Venture X</span>
            <span className="brand-edition">2026 Edition</span>
          </motion.a>
        </div>

        <button
          type="button"
          className="menu-trigger"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Menu size={20} strokeWidth={1.6} aria-hidden="true" />
          <span>Menu</span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="VentureX navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="menu-overlay__inner">
              <div className="menu-collage" aria-label="VentureX visual collage">
                <div className="collage-kicker">E-CELL / BMSIT&amp;M</div>
                <motion.div
                  className="collage-image collage-image--spread"
                  initial={{ opacity: 0, x: -28, rotate: -3 }}
                  animate={{ opacity: 1, x: 0, rotate: -3 }}
                  transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img src={image26} alt="VentureX founders collaborating on a startup project" />
                </motion.div>
                <motion.div
                  className="collage-image collage-image--founders"
                  initial={{ opacity: 0, y: 28, rotate: 4 }}
                  animate={{ opacity: 1, y: 0, rotate: 4 }}
                  transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img src={image37} alt="VentureX participants networking at an event" />
                </motion.div>
                <motion.div
                  className="collage-image collage-image--capital"
                  initial={{ opacity: 0, x: -18, rotate: -7 }}
                  animate={{ opacity: 1, x: 0, rotate: -7 }}
                  transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img src={image43} alt="VentureX audience attending an investor event" />
                </motion.div>
                <div className="collage-caption">
                  <span>Ideas today</span>
                  <strong>Impact tomorrow</strong>
                </div>
              </div>

              <div className="menu-navigation">
                <div className="menu-navigation__eyebrow">Navigate VentureX</div>
                <nav aria-label="Main navigation">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="menu-link"
                      onClick={closeMenu}
                      initial={{ opacity: 0, x: 26 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.12 + index * 0.055, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="menu-link__number">0{index + 1}</span>
                      <span className="menu-link__label">{item.label}</span>
                      <ArrowUpRight className="menu-link__arrow" size={28} strokeWidth={1.4} aria-hidden="true" />
                    </motion.a>
                  ))}
                </nav>
              </div>
            </div>

            <button type="button" className="menu-close" onClick={closeMenu}>
              <span>CLOSE</span>
              <X size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
