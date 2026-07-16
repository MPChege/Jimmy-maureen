'use client'

import { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from './SectionHeading'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const target = new Date('2026-08-08T12:00:00')
  const now = new Date()
  const diff = target.getTime() - now.getTime()

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds }
}

const FlipUnit = memo(function FlipUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="glass-card rounded-xl sm:rounded-2xl w-16 h-20 sm:w-24 sm:h-28 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              initial={{ y: 40, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -40, opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="text-3xl sm:text-5xl font-heading font-bold text-gradient-gold"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-2 right-2 h-[1px] bg-gold/5 pointer-events-none" />
      </div>
      <span className="text-[10px] sm:text-xs text-cream/40 mt-2 sm:mt-3 uppercase tracking-[0.2em] font-light">
        {label}
      </span>
    </div>
  )
})

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-14 sm:mb-16">
          <SectionHeading label="Counting Down" title="Our Special Day" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex justify-center gap-3 sm:gap-6"
        >
          <FlipUnit value={timeLeft.days} label="Days" />
          <span className="text-gold/30 text-3xl sm:text-5xl font-heading self-start mt-2 sm:mt-3">:</span>
          <FlipUnit value={timeLeft.hours} label="Hours" />
          <span className="text-gold/30 text-3xl sm:text-5xl font-heading self-start mt-2 sm:mt-3">:</span>
          <FlipUnit value={timeLeft.minutes} label="Minutes" />
          <span className="text-gold/30 text-3xl sm:text-5xl font-heading self-start mt-2 sm:mt-3">:</span>
          <FlipUnit value={timeLeft.seconds} label="Seconds" />
        </motion.div>
      </div>
    </section>
  )
}
