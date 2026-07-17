'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function OurStory() {
  return (
    <section id="story" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="font-heading text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-heading text-3xl sm:text-5xl text-cream mb-8 font-light leading-tight">
              How It All
              <br />
              <span className="text-gradient-gold">Began</span>
            </h2>

            <div className="space-y-5 text-cream/60 font-light leading-relaxed text-sm sm:text-base">
              <p>
                Every beautiful story begins with a single hello. Ours became laughter,
                friendship, love, and now the next chapter.
              </p>
              <p>
                What started as two strangers crossing paths turned into an unbreakable
                bond built on trust, shared dreams, and countless moments of joy.
              </p>
              <p>
                We believe that love is not just about finding the right person, but
                about building a life together. And we would be honored to have you
                celebrate this special moment with us.
              </p>
            </div>

            <motion.div
              className="mt-10 flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-gold/20 to-transparent" />
              <span className="font-heading text-gold/40 text-sm italic">
                Jimmi &amp; Maureen
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-gold/20 to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/couple-story.jpg"
                alt="Jimmi & Maureen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/5 via-transparent to-transparent" />
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
