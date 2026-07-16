'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()

    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible, isTouchDevice, x, y])

  if (isTouchDevice) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          x: x.get() - 160,
          y: y.get() - 160,
          background:
            'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
        }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full pointer-events-none"
        style={{
          x: x.get() - 80,
          y: y.get() - 80,
          background:
            'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}
