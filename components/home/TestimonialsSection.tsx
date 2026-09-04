'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const testimonials = [
    { text: t('t1_text'), name: t('t1_name') },
    { text: t('t2_text'), name: t('t2_name') },
    { text: t('t3_text'), name: t('t3_name') },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#060e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Testimonials</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">{t('title')}</h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ text, name }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="bg-dark-card border border-white/5 p-8 rounded-sm relative group hover:border-gold/30 transition-colors duration-300"
            >
              {/* Quote mark */}
              <div className="font-playfair text-6xl text-gold/20 leading-none absolute top-4 left-6">&ldquo;</div>

              <div className="flex gap-1 mb-6 mt-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">&ldquo;{text}&rdquo;</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-playfair font-bold">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{name}</p>
                  <p className="text-white/40 text-xs">Loyal Customer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
