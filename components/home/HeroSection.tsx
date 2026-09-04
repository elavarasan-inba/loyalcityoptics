'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams } from 'next/navigation';

const IrisExpand = dynamic(() => import('@/components/three/IrisExpand'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

// Floating particles
function Particles() {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
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

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setScrollProgress(v);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const irisScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.4]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0f1f3a] via-navy to-[#050d1a]" />

      {/* Particles */}
      <Particles />

      {/* Gold thin lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* 3D Iris */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ scale: irisScale }}
      >
        <div className="w-[min(60vw,60vh)] h-[min(60vw,60vh)] opacity-80">
          <IrisExpand scrollProgress={scrollProgress} />
        </div>
      </motion.div>

      {/* Iris glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(201,168,76,${scrollProgress * 0.15}) 0%, transparent 60%)`,
        }}
      />

      {/* Hero content — appears after iris expands */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="h-px w-20 bg-gold/50" />
            <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium">
              Since 1998
            </span>
            <div className="h-px w-20 bg-gold/50" />
          </div>

          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            <span className="block text-gold">LOYAL CITY</span>
            <span className="block">OPTICS</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <p className="font-playfair text-2xl md:text-4xl text-white/90 mb-4 italic">
            {t('tagline')}
          </p>
          <p className="text-gold/70 text-sm md:text-base tracking-widest uppercase mb-12">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/book`}
              className="btn-gold text-sm tracking-widest uppercase px-8 py-4"
            >
              {t('cta')}
            </Link>
            <Link
              href={`/${locale}/gallery`}
              className="btn-outline-gold text-sm tracking-widest uppercase px-8 py-4"
            >
              {t('cta2')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
      </motion.div>
    </section>
  );
}
