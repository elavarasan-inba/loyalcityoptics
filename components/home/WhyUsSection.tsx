'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Award, Users, Glasses, Zap, Heart } from 'lucide-react';

const items = [
  { key: 'item1', icon: Award },
  { key: 'item2', icon: Users },
  { key: 'item3', icon: Glasses },
  { key: 'item4', icon: Zap },
  { key: 'item5', icon: Heart },
];

export default function WhyUsSection() {
  const t = useTranslations('why');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Our Promise</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">{t('title')}</h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>

        {/* Horizontal scroll container on mobile, grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative bg-dark-card border border-white/5 p-6 rounded-sm text-center group hover:border-gold/40 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <Icon size={20} className="text-gold" />
              </div>
              <h3 className="font-playfair text-lg text-white mb-2 group-hover:text-gold transition-colors">
                {(t as (k: string) => string)(key)}
              </h3>
              <p className="text-white/40 text-sm">{(t as (k: string) => string)(`${key}_desc`)}</p>

              {/* Number */}
              <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-gold flex items-center justify-center text-navy text-xs font-bold">
                {i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
