'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-16 sm:py-20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/5 mb-6"
          >
            <Heart className="w-5 h-5 text-gold/40" fill="currentColor" />
          </motion.div>

          <p className="text-cream/40 text-sm sm:text-base font-light leading-relaxed max-w-md mx-auto mb-6">
            Thank you for celebrating this special day with us. Your presence is the
            greatest gift of all.
          </p>

          <p className="font-heading text-xl sm:text-2xl text-cream/60 font-light">
            With love,
          </p>
          <p className="font-heading text-2xl sm:text-3xl text-gradient-gold mt-2 font-light">
            Jimmi <span className="text-cream/30">&amp;</span> Maureen
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-cream/15 text-xs mt-10 font-light tracking-wide"
          >
            August 8, 2026
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
