'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { X, ZoomIn } from 'lucide-react';

const FRAMES = [
  { id: 1, category: 'men', src: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80', alt: 'Classic men frame' },
  { id: 2, category: 'women', src: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', alt: 'Elegant women frame' },
  { id: 3, category: 'sunglasses', src: 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600&q=80', alt: 'Luxury sunglasses' },
  { id: 4, category: 'men', src: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=600&q=80', alt: 'Round men frame' },
  { id: 5, category: 'women', src: 'https://images.unsplash.com/photo-1556306535-38febf6782e4?w=600&q=80', alt: 'Cat eye frame' },
  { id: 6, category: 'kids', src: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80', alt: 'Colourful kids frame' },
  { id: 7, category: 'sunglasses', src: 'https://images.unsplash.com/photo-1601699491406-be5f0e27aba4?w=600&q=80', alt: 'Aviator sunglasses' },
  { id: 8, category: 'unisex', src: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80', alt: 'Unisex frame' },
  { id: 9, category: 'men', src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80', alt: 'Wayfarer frame' },
  { id: 10, category: 'women', src: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=600&q=80', alt: 'Oversized women frame' },
  { id: 11, category: 'sunglasses', src: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80', alt: 'Sports sunglasses' },
  { id: 12, category: 'unisex', src: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', alt: 'Round unisex frame' },
];

const FILTERS = ['all', 'men', 'women', 'unisex', 'kids', 'sunglasses'] as const;

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const [active, setActive] = useState<'all' | 'men' | 'women' | 'unisex' | 'kids' | 'sunglasses'>('all');
  const [lightbox, setLightbox] = useState<(typeof FRAMES)[0] | null>(null);
  const filtered = active === 'all' ? FRAMES : FRAMES.filter((f) => f.category === active);

  return (
    <div className="bg-navy min-h-screen">
      {/* Hero */}
      <div className="relative pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060e1a] to-navy" />
        <div className="relative max-w-4xl mx-auto px-4">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Eyewear</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-white mb-6">{t('title')}</h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-white/60 text-lg">{t('subtitle')}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-20 z-30 bg-navy/90 backdrop-blur-md border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 flex-wrap">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`text-xs tracking-widest uppercase px-5 py-2.5 rounded-sm transition-all duration-200 ${
                active === filter
                  ? 'bg-gold text-navy font-semibold'
                  : 'text-white/60 hover:text-gold border border-white/10 hover:border-gold/40'
              }`}
            >
              {(t as (k: string) => string)(filter)}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((frame, i) => (
              <motion.div
                key={frame.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer"
                onClick={() => setLightbox(frame)}
              >
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="border border-gold p-3 rounded-full">
                    <ZoomIn size={20} className="text-gold" />
                  </div>
                </div>
                <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-colors rounded-sm" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-2xl w-full aspect-square rounded-sm overflow-hidden border border-gold/30"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightbox.src} alt={lightbox.alt} fill className="object-cover" />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-navy/80 flex items-center justify-center hover:bg-navy transition-colors border border-white/20"
              >
                <X size={18} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
