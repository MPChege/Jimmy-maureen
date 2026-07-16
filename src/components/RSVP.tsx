'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const reactions: Record<string, { emoji: string; title: string; message: string; vibe: 'lit' | 'sad' | 'mid' }> = {
  yes: {
    emoji: '✨',
    title: 'Yesss! Let\'s Gooo! 🎉',
    message: 'Jimmi & Maureen are literally SO excited to have you there! It\'s gonna be giving… love, family, and good vibes only.',
    vibe: 'lit',
  },
  no: {
    emoji: '💀',
    title: 'It\'s Giving… Ghosted 💀',
    message: 'Bruh. You really hit us with the \'can\'t make it\'? We\'ll still save you a plate tho. No hard feelings… maybe.',
    vibe: 'sad',
  },
  maybe: {
    emoji: '🤔',
    title: 'The Uncertainty is… Uncertain',
    message: 'A maybe? We see you keeping your options open. No pressure—just know the vibes won\'t be the same without you!',
    vibe: 'mid',
  },
}

const attendanceOptions = [
  { value: 'yes', label: '100% I\'m there', emoji: '🔥', description: 'wouldn\'t miss it for the world' },
  { value: 'no', label: 'Can\'t make it sorry', emoji: '💀', description: 'it\'s giving… busy schedule' },
  { value: 'maybe', label: 'Lowkey considering', emoji: '🤔', description: 'let me check my calendar fr' },
]

const guestCounts = Array.from({ length: 10 }, (_, i) => i + 1)

interface FormData {
  name: string
  phone: string
  guests: string
  attendance: string
  message: string
}

const initialForm: FormData = {
  name: '',
  phone: '',
  guests: '1',
  attendance: '',
  message: '',
}

function PopReaction({ type, onClose }: { type: 'yes' | 'no' | 'maybe'; onClose: () => void }) {
  const r = reactions[type]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 40 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative max-w-sm w-full rounded-3xl p-8 text-center"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, rgba(30,20,16,0.95), rgba(26,15,10,0.98))',
          border: '1px solid rgba(212,175,55,0.15)',
        }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.2, 1], rotate: [0, type === 'no' ? -10 : type === 'maybe' ? 5 : -5, 0] }}
          transition={{ duration: 0.6 }}
        >
          {r.emoji}
        </motion.div>

        <h3 className="font-heading text-2xl text-cream mb-2">{r.title}</h3>
        <p className="text-cream/50 text-sm font-light leading-relaxed mb-6">{r.message}</p>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {r.vibe === 'lit' && Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              className="text-lg"
              animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            >
              {['🎉', '✨', '🥳'][i]}
            </motion.span>
          ))}
          {r.vibe === 'sad' && Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              className="text-lg"
              animate={{ rotate: [0, 15, -15, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {['😢', '💔', '🕊️'][i]}
            </motion.span>
          ))}
          {r.vibe === 'mid' && Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              className="text-lg"
              animate={{ x: [0, 8, -8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }}
            >
              {['🤷', '⏳', '🧐'][i]}
            </motion.span>
          ))}
        </div>

        <motion.button
          onClick={onClose}
          className="px-6 py-2.5 rounded-full text-sm text-cream/60 border border-gold/10 hover:border-gold/30 transition-colors cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {type === 'yes' ? 'Aight, let\'s go! 🔥' : type === 'no' ? 'I mean… okay 😔' : 'Fair enough 🤷'}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

function SuccessAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 sm:py-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mb-6 sm:mb-8"
      >
        <motion.span
          className="text-3xl sm:text-4xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ✅
        </motion.span>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="font-heading text-2xl sm:text-3xl text-cream mb-3"
      >
        Bet! You&apos;re on the list 🎯
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-cream/50 text-sm sm:text-base font-light text-center max-w-sm"
      >
        We got your response! Jimmi & Maureen are literally counting down the days. See you there bestie!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.5, type: 'spring' }}
        className="mt-8 flex gap-2"
      >
        {['🎉', '✨', '🥂', '💃', '🎊'].map((e, i) => (
          <motion.span
            key={i}
            className="text-xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
          >
            {e}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function RSVP() {
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showReaction, setShowReaction] = useState<'yes' | 'no' | 'maybe' | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Uh oh, we need your name bestie ✨'
    }
    if (!formData.attendance) {
      newErrors.attendance = 'C\'mon, yes or no? Don\'t leave us hanging 😅'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const triggerConfetti = () => {
    const duration = 3 * 1000
    const end = Date.now() + duration
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#ffffff', '#FFD700'],
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#ffffff', '#FFD700'],
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        setIsSubmitting(false)
        setIsSubmitted(true)
        if (formData.attendance === 'yes') {
          triggerConfetti()
        }
      } else {
        setIsSubmitting(false)
        alert('Something went wrong bestie. Try again later! 🙏')
      }
    } catch {
      setIsSubmitting(false)
      alert('No internet bestie? Check your connection! 📡')
    }
  }

  const handleAttendanceSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, attendance: value }))
    if (errors.attendance) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy.attendance
        return copy
      })
    }
    setShowReaction(value as 'yes' | 'no' | 'maybe')
  }

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[field]
        return copy
      })
    }
  }

  const baseInputClasses =
    'w-full bg-card/50 border rounded-xl px-4 py-3.5 text-cream text-sm font-light placeholder:text-cream/20 transition-all duration-300'

  const getInputClasses = (field: string) =>
    `${baseInputClasses} ${
      errors[field as keyof FormData] ? 'border-accent/50' : 'border-gold/10'
    } ${focusedField === field ? 'border-gold/30 bg-card/80 shadow-lg shadow-gold/5' : ''}`

  return (
    <section id="rsvp" className="relative py-24 sm:py-32">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.p
            className="font-heading text-gold/50 text-xs tracking-[0.35em] uppercase mb-2 font-light"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦ RSVP ✦
          </motion.p>
          <h2 className="font-heading text-3xl sm:text-5xl text-cream font-light mb-3">
            You&apos;re Invited Bestie
          </h2>
          <p className="text-cream/30 text-sm font-light max-w-md mx-auto">
            Drop your deets below before July 25th — don&apos;t keep us hanging fr fr
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SuccessAnimation />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl p-6 sm:p-10"
              ref={formRef}
              style={{
                background: 'linear-gradient(145deg, rgba(30,20,16,0.8), rgba(26,15,10,0.9))',
                border: '1px solid rgba(212,175,55,0.1)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label className="block text-cream/40 text-xs tracking-[0.15em] uppercase mb-2 font-light">
                    Your Name <span className="text-gold/40">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/20 text-sm">👤</span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your full name"
                      className={`${getInputClasses('name')} pl-10`}
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-accent/50 text-xs mt-1.5 font-light"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-cream/40 text-xs tracking-[0.15em] uppercase mb-2 font-light">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/20 text-sm">📱</span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="+254 7XX XXX XXX"
                      className={`${baseInputClasses} pl-10 border-gold/10 ${
                        focusedField === 'phone' ? 'border-gold/30 bg-card/80 shadow-lg shadow-gold/5' : ''
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-cream/40 text-xs tracking-[0.15em] uppercase mb-2 font-light">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/20 text-sm">👥</span>
                    <select
                      value={formData.guests}
                      onChange={(e) => updateField('guests', e.target.value)}
                      onFocus={() => setFocusedField('guests')}
                      onBlur={() => setFocusedField(null)}
                      className={`${baseInputClasses} pl-10 border-gold/10 ${
                        focusedField === 'guests' ? 'border-gold/30 bg-card/80' : ''
                      }`}
                    >
                      {guestCounts.map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-cream/40 text-xs tracking-[0.15em] uppercase mb-3 font-light">
                    Will You Attend? <span className="text-gold/40">*</span>
                  </label>
                  <div className="grid gap-2.5">
                    {attendanceOptions.map((opt) => {
                      const isSelected = formData.attendance === opt.value
                      return (
                        <motion.button
                          key={opt.value}
                          onClick={() => handleAttendanceSelect(opt.value)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl border transition-all duration-300 text-left cursor-pointer ${
                            isSelected
                              ? 'border-gold/40 bg-gold/5 shadow-lg shadow-gold/5'
                              : 'border-gold/5 bg-card/30 text-cream/50 hover:border-gold/15 hover:bg-card/50'
                          }`}
                        >
                          <motion.span
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
                              isSelected ? 'bg-gold/20 scale-110' : 'bg-card/50'
                            }`}
                            animate={isSelected ? { rotate: [0, 10, -10, 0] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            {opt.emoji}
                          </motion.span>
                          <div className="flex-1">
                            <span
                              className={`text-sm block ${
                                isSelected ? 'text-cream' : 'text-cream/50'
                              }`}
                            >
                              {opt.label}
                            </span>
                            <span className="text-[10px] text-cream/20 font-light">
                              {opt.description}
                            </span>
                          </div>
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-gold text-sm"
                            >
                              ✓
                            </motion.span>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                  {errors.attendance && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-accent/50 text-xs mt-1.5 font-light"
                    >
                      {errors.attendance}
                    </motion.p>
                  )}


                </div>

                <div>
                  <label className="block text-cream/40 text-xs tracking-[0.15em] uppercase mb-2 font-light">
                    Message <span className="text-cream/10">(optional, but cute)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-cream/20 text-sm">💌</span>
                    <textarea
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="A special note for Jimmi & Maureen... make it sweet bestie"
                      rows={3}
                      className={`${baseInputClasses} pl-10 resize-none border-gold/10 ${
                        focusedField === 'message' ? 'border-gold/30 bg-card/80 shadow-lg shadow-gold/5' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="relative w-full py-4 px-8 rounded-full overflow-hidden cursor-pointer disabled:opacity-50 group"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.1))',
                      border: '1px solid rgba(212,175,55,0.25)',
                    }}
                  >
                    <motion.span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.15))',
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-3 justify-center">
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full"
                        />
                      ) : (
                        <>
                          <motion.span
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            ✨
                          </motion.span>
                          <span className="text-cream/80 text-sm tracking-wider uppercase font-light">
                            Send Response
                          </span>
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            🚀
                          </motion.span>
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showReaction && (
          <PopReaction type={showReaction} onClose={() => setShowReaction(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
