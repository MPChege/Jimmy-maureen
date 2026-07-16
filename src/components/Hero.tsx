'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown, Calendar, Clock } from 'lucide-react'

function GoldShimmer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 z-20 pointer-events-none animate-shimmer"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
    </span>
  )
}

function LetterReveal({
  text,
  className = '',
  baseDelay = 1,
}: {
  text: string
  className?: string
  baseDelay?: number
}) {
  const chars = text.split('')
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 120, opacity: 0, rotateZ: -8 }}
          animate={{ y: 0, opacity: 1, rotateZ: 0 }}
          transition={{
            duration: 0.9,
            delay: baseDelay + i * 0.045,
            ease: [0.15, 0.55, 0.25, 1],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

function BackgroundGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />

      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(185,95,61,0.12) 0%, transparent 70%)' }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(169,113,66,0.08) 0%, transparent 70%)' }}
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="diamonds" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect width="120" height="120" fill="none" />
              <path d="M60 0 L120 60 L60 120 L0 60 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
              <path d="M60 20 L100 60 L60 100 L20 60 Z" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
              <circle cx="60" cy="60" r="3" fill="#D4AF37" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamonds)" />
        </svg>
      </div>

      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${10 + ((i * 37 + 13) % 80)}%`,
            top: `${10 + ((i * 53 + 7) % 80)}%`,
            background: i % 2 === 0
              ? 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 100%)'
              : 'radial-gradient(circle, rgba(245,233,213,0.4) 0%, transparent 100%)',
            boxShadow: i % 2 === 0 ? '0 0 6px rgba(212,175,55,0.3)' : 'none',
          }}
          animate={{
            y: [0, -(20 + i * 5), 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            delay: i * 1.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const scrollToDetails = () => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-8"
    >
      <BackgroundGlow />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4">
            <GoldShimmer>
              <LetterReveal
                text="Jimmi"
                className="block font-heading text-5xl sm:text-7xl md:text-8xl lg:text-8xl leading-[1.05] text-cream font-light tracking-tight"
                baseDelay={0.8}
              />
            </GoldShimmer>
            <motion.span
              className="block font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl my-1 sm:my-2 animate-heartbeat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.2, type: 'spring', stiffness: 200 }}
              style={{ color: 'transparent', WebkitTextStroke: '1px rgba(212,175,55,0.6)' }}
            >
              &amp;
            </motion.span>
            <GoldShimmer>
              <LetterReveal
                text="Maureen"
                className="block font-heading text-5xl sm:text-7xl md:text-8xl lg:text-8xl leading-[1.05] text-cream font-light tracking-tight"
                baseDelay={1.8}
              />
            </GoldShimmer>
          </h1>

          <motion.div
            className="flex flex-wrap items-center gap-3 sm:gap-5 mb-6 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.2 }}
          >
            <div className="flex items-center gap-2 text-cream/50 text-xs sm:text-sm font-light">
              <Calendar className="w-3.5 h-3.5 text-gold/50" />
              <span>August 8th, 2026</span>
            </div>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-cream/10" />
            <div className="flex items-center gap-2 text-cream/50 text-xs sm:text-sm font-light">
              <Clock className="w-3.5 h-3.5 text-gold/50" />
              <span>12:00 Noon</span>
            </div>
          </motion.div>

          <motion.button
            onClick={scrollToDetails}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.5 }}
            className="group inline-flex items-center gap-2 text-cream/30 hover:text-gold/60 text-xs tracking-[0.2em] uppercase font-light transition-colors cursor-pointer"
          >
            <span>View Event Details</span>
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-3 h-3" />
            </motion.span>
          </motion.button>
        </motion.div>

        <motion.div
          className="flex-shrink-0 w-full max-w-sm sm:max-w-lg lg:max-w-xl"
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.15, 0.55, 0.25, 1] }}
        >
          <div className="relative group">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
              <Image
                src="/couple-hero.jpg"
                alt="Maureen & Jimmi"
                width={600}
                height={750}
                className="w-full h-auto object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, 500px"
                priority
              />

              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: 'linear-gradient(135deg, transparent 30%, rgba(212,175,55,0.04) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{ backgroundPosition: ['200% 200%', '-100% -100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <motion.div
              className="absolute -inset-[3px] rounded-2xl sm:rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15), transparent 40%, transparent 60%, rgba(212,175,55,0.1))',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.8 }}
      >
        <motion.span
          className="text-[10px] tracking-[0.25em] text-cream/20 uppercase font-light"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-gold/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
