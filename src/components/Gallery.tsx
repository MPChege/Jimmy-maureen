'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryItems = [
  {
    id: 1,
    src: '/couple-hero.jpg',
    label: 'The Beginning',
    filter: 'none',
    overlay: 'from-background/20 to-transparent',
  },
  {
    id: 2,
    src: '/couple-hero.jpg',
    label: 'Together',
    filter: 'sepia(0.3) hue-rotate(-10deg) saturate(1.2)',
    overlay: 'from-gold/10 to-transparent',
  },
  {
    id: 3,
    src: '/couple-hero.jpg',
    label: 'The Journey',
    filter: 'brightness(0.8) contrast(1.1) saturate(0.8)',
    overlay: 'from-accent/10 to-transparent',
  },
  {
    id: 4,
    src: '/couple-hero.jpg',
    label: 'Love',
    filter: 'saturate(1.3) brightness(1.05) hue-rotate(5deg)',
    overlay: 'from-bronze/10 to-transparent',
  },
  {
    id: 5,
    src: '/couple-hero.jpg',
    label: 'Celebration',
    filter: 'contrast(1.15) brightness(1.1) saturate(1.1)',
    overlay: 'from-amber-800/15 to-transparent',
  },
  {
    id: 6,
    src: '/couple-hero.jpg',
    label: 'Family',
    filter: 'sepia(0.15) hue-rotate(-5deg)',
    overlay: 'from-gold/5 to-bronze/5',
  },
  {
    id: 7,
    src: '/couple-hero.jpg',
    label: 'Forever',
    filter: 'brightness(0.9) saturate(1.2) contrast(1.05)',
    overlay: 'from-gold/10 to-accent/5',
  },
]

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)

  const openLightbox = (index: number) => {
    setDirection(0)
    setSelectedIndex(index)
  }

  const closeLightbox = () => setSelectedIndex(null)

  const goTo = useCallback(
    (newIndex: number) => {
      setDirection(newIndex > (selectedIndex ?? 0) ? 1 : -1)
      setSelectedIndex(newIndex)
    },
    [selectedIndex]
  )

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goTo((selectedIndex + 1) % galleryItems.length)
      if (e.key === 'ArrowLeft')
        goTo((selectedIndex - 1 + galleryItems.length) % galleryItems.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedIndex, goTo])

  return (
    <section id="gallery" className="relative py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="font-heading text-gold/50 text-xs tracking-[0.35em] uppercase mb-2 font-light">
            Gallery
          </p>
          <h2 className="font-heading text-2xl sm:text-4xl text-cream font-light">
            Our Memories
          </h2>
        </motion.div>

        <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {galleryItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              whileHover={{ scale: 1.015 }}
              onClick={() => openLightbox(index)}
              className="group relative w-full overflow-hidden rounded-xl cursor-pointer break-inside-avoid"
              style={{ aspectRatio: index === 1 ? '3/4' : index === 3 ? '4/3' : '1/1' }}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                style={{ filter: item.filter }}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${item.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-cream/70 text-[10px] sm:text-xs font-light tracking-wider">
                  {item.label}
                </p>
              </div>
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-gold/40 text-[10px] font-light font-heading">
                  0{index + 1}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 text-cream/40 hover:text-cream z-10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                goTo((selectedIndex - 1 + galleryItems.length) % galleryItems.length)
              }}
              className="absolute left-3 sm:left-6 text-cream/20 hover:text-cream/60 z-10 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                goTo((selectedIndex + 1) % galleryItems.length)
              }}
              className="absolute right-3 sm:right-6 text-cream/20 hover:text-cream/60 z-10 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={selectedIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 150 : -150 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -150 : 150 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg mx-4 sm:mx-6 aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden"
              >
                <Image
                  src={galleryItems[selectedIndex].src}
                  alt={galleryItems[selectedIndex].label}
                  fill
                  className="object-cover"
                  style={{ filter: galleryItems[selectedIndex].filter }}
                  sizes="500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-center">
                  <p className="text-cream/50 text-xs tracking-[0.25em] uppercase font-light">
                    {galleryItems[selectedIndex].label}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
              {galleryItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    goTo(idx)
                  }}
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                    idx === selectedIndex
                      ? 'bg-gold w-4 sm:w-6'
                      : 'bg-cream/15 hover:bg-cream/30 w-1.5 sm:w-2'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
