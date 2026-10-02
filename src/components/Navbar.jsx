import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import image26 from '../assets/image26.jpg'
import image37 from '../assets/image37.jpg'
import image43 from '../assets/image43.JPG'
import { getLenis } from '../lib/useLenis'
import './Navbar.css'

const menuItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About VentureX', href: '#intro' },
  { label: 'Event Flow', href: '#book' },
  { label: 'Investors', href: '#book' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const collageImages = [image26, image37, image43]

const preloadImage = (source) => new Promise((resolve) => {
  const image = new window.Image()
  image.onload = resolve
  image.onerror = resolve
  image.src = source
})

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [imagesReady, setImagesReady] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let cancelled = false

    Promise.all(collageImages.map(preloadImage)).then(() => {
      if (!cancelled) setImagesReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    document.documentElement.classList.toggle('menu-open', menuOpen)
    const smoothScroll = getLenis()

    if (menuOpen) {
      smoothScroll?.stop()
    } else {
      smoothScroll?.start()
    }

    return () => {
      document.body.classList.remove('menu-open')
      document.documentElement.classList.remove('menu-open')
    }
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
          aria-busy={!imagesReady}
          disabled={!imagesReady}
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
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="VentureX navigation"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="menu-overlay__inner">
              <motion.div
                className="menu-collage"
                aria-label="VentureX visual collage"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="collage-kicker">E-CELL / BMSIT&amp;M</div>
                <div className="collage-image collage-image--spread">
                  <img src={image26} alt="VentureX founders collaborating on a startup project" />
                </div>
                <div className="collage-image collage-image--founders">
                  <img src={image37} alt="VentureX participants networking at an event" />
                </div>
                <div className="collage-image collage-image--capital">
                  <img src={image43} alt="VentureX audience attending an investor event" />
                </div>
                <div className="collage-caption">
                  <span>Ideas today</span>
                  <strong>Impact tomorrow</strong>
                </div>
              </motion.div>

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
                      transition={{ duration: 0.38, delay: 0.12 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
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
