import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import loadingVideo from '../assets/loading.mp4'
import './LoadingScreen.css'

const EASE = [0.16, 1, 0.3, 1]

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 900)
    }, 2800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.85, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <video
            className="loading-video"
            src={loadingVideo}
            autoPlay
            muted
            playsInline
            loop
          />

          {/* Split brand — VENTURE left, X right — flanking the character */}
          <motion.div
            className="loading-brand loading-brand--left"
            initial={{ opacity: 0, y: '-50%' }}
            animate={{ opacity: 1, y: '-50%' }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            Venture
          </motion.div>

          <motion.div
            className="loading-brand loading-brand--right"
            initial={{ opacity: 0, y: '-50%' }}
            animate={{ opacity: 1, y: '-50%' }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            X
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
