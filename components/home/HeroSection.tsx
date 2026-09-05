'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams } from 'next/navigation';
import IrisExpand from '@/components/three/IrisExpand';

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
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.15 }}
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

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const irisScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.35]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-navy"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0f1f3a] via-navy to-[#050d1a]" />

      {/* Particles */}
      <Particles />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Iris ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(70vw, 70vh)',
          height: 'min(70vw, 70vh)',
          background: 'radial-gradient(circle, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0.06) 45%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Iris — anchored in lower half of the hero */}
      <div
        className="absolute left-1/2 pointer-events-none"
        style={{
          bottom: '-8%',
          transform: 'translateX(-50%)',
          width: 'min(68vw, 68vh)',
          height: 'min(68vw, 68vh)',
        }}
      >
        <motion.div style={{ scale: irisScale, width: '100%', height: '100%', opacity: 0.90 }}>
          <IrisExpand scrollProgress={0} />
        </motion.div>
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between pt-28 pb-24 px-4">

        {/* TOP: Badge + Heading */}
        <motion.div
          className="text-center w-full max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-6 mb-5">
            <div className="h-px w-16 bg-gold/50" />
            <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium">Since 1998</span>
            <div className="h-px w-16 bg-gold/50" />
          </div>

          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl leading-tight">
            <span className="block text-gold drop-shadow-[0_2px_16px_rgba(201,168,76,0.6)]">LOYAL CITY</span>
            <span className="block text-gold drop-shadow-[0_2px_16px_rgba(201,168,76,0.6)]">OPTICS</span>
          </h1>
        </motion.div>

        {/* BOTTOM: Tagline + Buttons */}
        <motion.div
          className="text-center w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <p className="font-playfair text-xl md:text-3xl text-white/90 mb-2 italic">
            {t('tagline')}
          </p>
          <p className="text-gold/60 text-xs md:text-sm tracking-widest uppercase mb-8">
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/40 to-transparent" />
      </motion.div>
    </section>
  );
}
