'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Eye, Glasses, Microscope, Sun } from 'lucide-react';

const services = [
  { key: 'eye_exam', icon: Eye },
  { key: 'frames', icon: Glasses },
  { key: 'lenses', icon: Microscope },
  { key: 'sunglasses', icon: Sun },
];

export default function ServicesSection() {
  const t = useTranslations('services');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/3 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
          ref={ref}
        >
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">What We Offer</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">{t('title')}</h2>
          <div className="w-16 h-px bg-gold mx-auto mb-4" />
          <p className="text-white/50 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative bg-dark-card border border-white/5 p-8 rounded-sm hover:-translate-y-2 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5 transition-all duration-400 cursor-default"
            >
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/30 group-hover:border-gold/70 transition-colors" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/30 group-hover:border-gold/70 transition-colors" />

              <div className="w-14 h-14 rounded-full bg-gold/10 group-hover:bg-gold/20 flex items-center justify-center mb-6 transition-colors duration-300">
                <Icon size={24} className="text-gold group-hover:scale-110 transition-transform duration-300" />
              </div>

              <h3 className="font-playfair text-xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
                {(t as (k: string) => string)(key)}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{(t as (k: string) => string)(`${key}_desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
