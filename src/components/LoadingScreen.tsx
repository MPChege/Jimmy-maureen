'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState<'loading' | 'ready'>('loading')
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setPhase('ready'), 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    setIsOpen(false)
    setTimeout(onEnter, 800)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, #1A0F0A 0%, #120B08 50%, #0A0604 100%)',
          }}
        >
          <div className="relative flex flex-col items-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-64 h-64 sm:w-80 sm:h-80 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.15, 0.55, 0.25, 1] }}
            >
              {phase === 'loading' ? (
                <div className="flex flex-col items-center gap-6 sm:gap-8">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.span
                      className="font-heading text-4xl sm:text-6xl text-cream font-light tracking-tight"
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      Jimmi
                    </motion.span>
                    <motion.span
                      className="font-heading text-xl sm:text-3xl"
                      style={{ color: 'transparent', WebkitTextStroke: '1px rgba(212,175,55,0.5)' }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      ♥
                    </motion.span>
                    <motion.span
                      className="font-heading text-4xl sm:text-6xl text-cream font-light tracking-tight"
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      Maureen
                    </motion.span>
                  </div>

                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-gold/40"
                        animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>

                  <motion.p
                    className="text-cream/20 text-xs tracking-[0.3em] uppercase font-light"
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Loading Invitation
                  </motion.p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center gap-8 sm:gap-10"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.span
                      className="font-heading text-4xl sm:text-6xl text-cream font-light"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      Jimmi
                    </motion.span>
                    <motion.span
                      className="font-heading text-2xl sm:text-4xl text-gold/60"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      ♥
                    </motion.span>
                    <motion.span
                      className="font-heading text-4xl sm:text-6xl text-cream font-light"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      Maureen
                    </motion.span>
                  </div>

                  <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

                  <motion.p
                    className="text-cream/30 text-xs tracking-[0.35em] uppercase font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    August 8, 2026
                  </motion.p>

                  <motion.button
                    onClick={handleEnter}
                    className="relative px-10 py-4 rounded-full overflow-hidden cursor-pointer group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
                        border: '1px solid rgba(212,175,55,0.2)',
                      }}
                    />
                    <motion.span
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.1))',
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-3 text-cream/80 text-sm tracking-[0.2em] uppercase font-light">
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="inline-block"
                      >
                        ✦
                      </motion.span>
                      Open Invitation
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>

                  <motion.p
                    className="text-cream/10 text-[10px] tracking-[0.2em] uppercase font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Made with ♥
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
