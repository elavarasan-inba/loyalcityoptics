'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const categories = [
  {
    key: 'classic',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80',
    tag: 'Timeless Style',
  },
  {
    key: 'designer',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
    tag: 'Luxury Brands',
  },
  {
    key: 'sports',
    image: 'https://images.unsplash.com/photo-1606422308-8cba0f4a5cbc?w=600&q=80',
    tag: 'Performance',
  },
];

export default function CollectionSection() {
  const t = useTranslations('collection');
  const params = useParams();
  const locale = params.locale as string;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32 bg-[#060e1a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Our Collection</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">{t('title')}</h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(({ key, image, tag }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <Link href={`/${locale}/gallery`} className="group block relative overflow-hidden rounded-sm aspect-[4/5]">
                <Image
                  src={image}
                  alt={(t as (k: string) => string)(key)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-colors duration-300 rounded-sm" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gold/70 text-xs tracking-widest uppercase mb-1">{tag}</p>
                  <h3 className="font-playfair text-2xl text-white group-hover:text-gold transition-colors duration-300">
                    {(t as (k: string) => string)(key)}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
