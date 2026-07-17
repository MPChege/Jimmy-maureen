'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Shirt } from 'lucide-react'

const details = [
  {
    icon: Calendar,
    title: 'Date',
    description: 'August 8th, 2026',
    color: 'from-gold/20 to-transparent',
  },
  {
    icon: Clock,
    title: 'Time',
    description: '12:00 Noon',
    color: 'from-bronze/20 to-transparent',
  },
  {
    icon: MapPin,
    title: 'Venue',
    description: 'Kahawa Sukari, Kericho Road, 3rd Avenue, House 303',
    color: 'from-accent/20 to-transparent',
  },
  {
    icon: Shirt,
    title: 'Dress Code',
    description: 'Elegant African Chic',
    color: 'from-gold/10 to-bronze/10',
  },
]

function DetailCard({
  icon: Icon,
  title,
  description,
  color,
  index,
}: {
  icon: typeof Calendar
  title: string
  description: string
  color: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="glass-card rounded-2xl p-6 sm:p-8 h-full transition-all duration-500">
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="relative z-10">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gold/5 flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors duration-500">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold/60 group-hover:text-gold transition-colors duration-500" />
          </div>

          <h3 className="font-heading text-cream/40 text-xs tracking-[0.2em] uppercase mb-2">
            {title}
          </h3>
          <p className="font-heading text-lg sm:text-xl text-cream font-light">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function EventDetails() {
  return (
    <section id="details" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-heading text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">
            Event Details
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl text-cream font-light">
            Everything You Need to Know
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {details.map((detail, index) => (
            <DetailCard key={detail.title} {...detail} index={index} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-cream/30 text-sm mt-10 font-light"
        >
          Ceremony to be followed by lunch and celebration
        </motion.p>
      </div>
    </section>
  )
}
