'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Clock } from 'lucide-react';

const timeline = [
  { year: '1998', event: 'Founded in Salmiya, Kuwait' },
  { year: '2000', event: 'Expanded frame collection to 200+ styles' },
  { year: '2005', event: 'Introduced precision lens cutting in-house' },
  { year: '2010', event: 'Reached 5,000 satisfied customers' },
  { year: '2015', event: 'Partnered with international luxury brands' },
  { year: '2020', event: 'Launched digital eye examination tools' },
  { year: '2024', event: 'Serving 10,000+ customers across Kuwait' },
];

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="bg-navy min-h-screen">
      {/* Hero */}
      <div className="relative pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060e1a] to-navy" />
        <div className="relative max-w-4xl mx-auto px-4">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-white mb-6">{t('story_title')}</h1>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>
      </div>

      {/* Story */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              {t('story_body').split('\n\n').map((para, i) => (
                <p key={i} className="text-white/70 text-lg leading-relaxed mb-6">
                  {para}
                </p>
              ))}
            </div>
            <div className="space-y-4">
              <div className="bg-dark-card border border-gold/20 p-6 rounded-sm">
                <div className="font-playfair text-5xl text-gold font-bold mb-2">26+</div>
                <div className="text-white/60 text-sm">Years of Excellence</div>
              </div>
              <div className="bg-dark-card border border-gold/20 p-6 rounded-sm">
                <div className="font-playfair text-5xl text-gold font-bold mb-2">10K+</div>
                <div className="text-white/60 text-sm">Happy Customers</div>
              </div>
              <div className="bg-dark-card border border-gold/20 p-6 rounded-sm">
                <div className="font-playfair text-5xl text-gold font-bold mb-2">500+</div>
                <div className="text-white/60 text-sm">Frame Styles</div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#060e1a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <div className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Our Journey</p>
              <h2 className="font-playfair text-4xl text-white mb-4">26 Years of Growth</h2>
              <div className="w-16 h-px bg-gold mx-auto" />
            </div>
          </Section>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {timeline.map(({ year, event }, i) => (
                <Section key={year} delay={i * 0.1}>
                  <div className={`flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1">
                      <div className={`bg-dark-card border border-white/5 hover:border-gold/30 p-6 rounded-sm transition-colors ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <p className="text-white/70 text-sm">{event}</p>
                      </div>
                    </div>

                    {/* Year bubble */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-gold bg-navy flex items-center justify-center z-10">
                      <span className="font-playfair text-gold text-sm font-bold">{year}</span>
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">What We Stand For</p>
            <h2 className="font-playfair text-4xl text-white mb-4">{t('values_title')}</h2>
            <div className="w-16 h-px bg-gold mx-auto" />
          </div>
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(['value1', 'value2', 'value3'] as const).map((key, i) => (
            <Section key={key} delay={i * 0.15}>
              <div className="border border-gold/20 p-10 rounded-sm text-center hover:border-gold/50 transition-colors group">
                <div className="w-12 h-px bg-gold mx-auto mb-6" />
                <h3 className="font-playfair text-2xl text-gold mb-4">{(t as (k: string) => string)(`${key}_title`)}</h3>
                <p className="text-white/60 leading-relaxed">{(t as (k: string) => string)(`${key}_desc`)}</p>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-[#060e1a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Section>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Find Us</p>
            <h2 className="font-playfair text-4xl text-white mb-10">Visit Our Store</h2>
            <div className="space-y-4 text-white/70">
              <div className="flex items-center justify-center gap-3">
                <MapPin size={18} className="text-gold shrink-0" />
                <span>Saba Street #118, Block #10, Near Gulf British Academy & Edee Super Market, Salmiya, Kuwait</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone size={18} className="text-gold shrink-0" />
                <span>+965 2562 0966 | +965 6960 2959</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock size={18} className="text-gold shrink-0" />
                <span>Sat–Thu: 9:00 AM – 9:30 PM | Fri: 10:00 AM – 9:30 PM</span>
              </div>
            </div>
          </Section>
        </div>
      </section>
    </div>
  );
}
