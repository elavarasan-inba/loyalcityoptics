'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

function Counter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function AboutStrip() {
  const t = useTranslations('about');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-[#060e1a] border-y border-gold/20 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Big number */}
          <div className="text-center md:text-left">
            <div className="font-playfair text-[clamp(6rem,20vw,14rem)] leading-none text-gold font-bold opacity-90">
              <Counter target={26} />
            </div>
            <div className="h-px w-32 bg-gold/40 mx-auto md:mx-0 mt-2 mb-4" />
            <p className="text-white/50 text-sm tracking-[0.2em] uppercase">Years of Excellence</p>
          </div>

          {/* Right: Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-playfair text-3xl md:text-4xl text-white leading-snug mb-6"
            >
              {t('title')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/60 text-lg leading-relaxed mb-8"
            >
              {t('description')}
            </motion.p>
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { value: '500+', label: 'Frame Styles' },
                { value: '10K+', label: 'Happy Customers' },
                { value: '1998', label: 'Established' },
              ].map((stat) => (
                <div key={stat.label} className="border border-gold/20 p-4 rounded-sm">
                  <div className="font-playfair text-2xl text-gold font-bold">{stat.value}</div>
                  <div className="text-white/40 text-xs mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
