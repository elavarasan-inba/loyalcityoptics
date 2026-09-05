'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function Particles() {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: sr(i * 7 + 1) * 100,
    y: sr(i * 13 + 2) * 100,
    size: sr(i * 11 + 3) * 3 + 1,
    duration: sr(i * 17 + 4) * 10 + 8,
    delay: sr(i * 19 + 5) * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0.05, 0.25, 0.05] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const t = useTranslations('hero');
  const params = useParams();
  const locale = params.locale as string;
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0f1f3a] via-navy to-[#050d1a]" />

      {/* Subtle radial gold glow at center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(201,168,76,0.12) 0%, transparent 70%)' }}
      />

      {/* Particles */}
      <Particles />

      {/* Gold accent lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

        {/* Badge */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px w-20 bg-gold/50" />
          <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium">Since 1998</span>
          <div className="h-px w-20 bg-gold/50" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="font-playfair text-5xl md:text-7xl lg:text-8xl leading-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span
            className="block text-gold"
            style={{ textShadow: '0 0 80px rgba(201,168,76,0.5)' }}
          >
            LOYAL CITY
          </span>
          <span
            className="block text-gold"
            style={{ textShadow: '0 0 80px rgba(201,168,76,0.5)' }}
          >
            OPTICS
          </span>
        </motion.h1>

        {/* Tagline + Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="font-playfair text-2xl md:text-4xl text-white/90 mb-3 italic">
            {t('tagline')}
          </p>
          <p className="text-gold/60 text-sm tracking-widest uppercase mb-10">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/book`} className="btn-gold text-sm tracking-widest uppercase px-8 py-4">
              {t('cta')}
            </Link>
            <Link href={`/${locale}/gallery`} className="btn-outline-gold text-sm tracking-widest uppercase px-8 py-4">
              {t('cta2')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
      </motion.div>
    </section>
  );
}
