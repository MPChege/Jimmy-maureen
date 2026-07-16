'use client'

import { motion } from 'framer-motion'

export default function SectionHeading({
  label,
  title,
}: {
  label: string
  title: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10 sm:mb-12"
    >
      <p className="font-heading text-gold/50 text-[10px] sm:text-xs tracking-[0.35em] uppercase mb-2 sm:mb-3 font-light">
        {label}
      </p>
      <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-cream font-light relative inline-block">
        <span className="relative z-10">{title}</span>
        <span
          className="absolute inset-0 z-20 pointer-events-none animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.12) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
        />
      </h2>
    </motion.div>
  )
}
