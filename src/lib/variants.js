/**
 * Shared Framer Motion variants for the premium animation system.
 * All animations respect prefers-reduced-motion via the parent's
 * `initial="hidden" whileInView="visible"` pattern.
 */

export const EASE_CINEMATIC = [0.16, 1, 0.3, 1]          // Expo out
export const EASE_ELEGANT   = [0.25, 0.46, 0.45, 0.94]   // Ease out
export const EASE_SMOOTH    = [0.43, 0.13, 0.23, 0.96]   // Custom sine

/* ── Fade Up ─────────────────────────────────────────── */
export const fadeUp = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.9, ease: EASE_CINEMATIC } },
}

/* ── Fade Up (subtle) ────────────────────────────────── */
export const fadeUpSubtle = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.7, ease: EASE_ELEGANT } },
}

/* ── Fade In ─────────────────────────────────────────── */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { duration: 0.8, ease: EASE_ELEGANT } },
}

/* ── Scale In ────────────────────────────────────────── */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.8, ease: EASE_CINEMATIC } },
}

/* ── Clip Reveal (mask bottom→top) ──────────────────── */
export const clipReveal = {
  hidden:  { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
  visible: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1,
    transition: { duration: 1.0, ease: EASE_CINEMATIC } },
}

/* ── Scale Up (image zoom out) ───────────────────────── */
export const imgReveal = {
  hidden:  { opacity: 0, scale: 1.1 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 1.1, ease: EASE_CINEMATIC } },
}

/* ── Stagger container ───────────────────────────────── */
export const staggerContainer = (stagger = 0.1, delayChildren = 0.05) => ({
  hidden:  {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

/* ── Stagger child (fast fadeUp) ─────────────────────── */
export const staggerChild = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.65, ease: EASE_CINEMATIC } },
}

/* ── Headline word reveal ────────────────────────────── */
export const wordReveal = {
  hidden:  { y: '110%', opacity: 0 },
  visible: { y: '0%',   opacity: 1,
    transition: { duration: 0.85, ease: EASE_CINEMATIC } },
}

/* ── Line reveal container ───────────────────────────── */
export const lineContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

/* ── Count Up (used w/ useMotionValue) ───────────────── */
export const countUp = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' } },
}

/* ── Slide from left ─────────────────────────────────── */
export const slideLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.9, ease: EASE_CINEMATIC } },
}

/* ── Slide from right ────────────────────────────────── */
export const slideRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.9, ease: EASE_CINEMATIC } },
}

/* ── Viewport config ─────────────────────────────────── */
export const VP_ONCE    = { once: true, amount: 0.15 }
export const VP_PARTIAL = { once: true, amount: 0.05 }
export const VP_HALF    = { once: true, amount: 0.4 }
