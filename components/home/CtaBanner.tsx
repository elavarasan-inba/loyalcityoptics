'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '96569602959';

export default function CtaBanner() {
  const t = useTranslations('cta');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B6914] via-[#C9A84C] to-[#8B6914]" />
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(0,0,0,0.3) 20px,
            rgba(0,0,0,0.3) 21px
          )`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-playfair text-4xl md:text-6xl text-navy font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-navy/70 text-lg mb-10">{t('subtitle')}</p>

          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-navy text-gold font-semibold px-8 py-4 rounded-sm hover:bg-[#0f1f3a] transition-colors duration-300 text-sm tracking-widest uppercase"
          >
            <MessageCircle size={20} className="text-[#25D366]" />
            {t('button')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
