'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, MessageCircle, Mail, Clock } from 'lucide-react';

const WHATSAPP = '96569602959';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="bg-navy min-h-screen">
      {/* Hero */}
      <div className="relative pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060e1a] to-navy" />
        <div className="relative max-w-2xl mx-auto px-4">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Reach Us</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-white mb-6">{t('title')}</h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-white/60 text-lg">{t('subtitle')}</p>
        </div>
      </div>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Address</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{t('address')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Phone</h3>
                  <a href="tel:+96525620966" className="text-white/60 text-sm hover:text-gold transition-colors block">
                    +965 2562 0966
                  </a>
                  <a href="tel:+96569602959" className="text-white/60 text-sm hover:text-gold transition-colors block">
                    +965 6960 2959
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <MessageCircle size={20} className="text-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">WhatsApp</h3>
                  <a
                    href={`https://wa.me/${WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366]/80 text-sm hover:text-[#25D366] transition-colors"
                  >
                    +965 6960 2959
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Email</h3>
                  <a href="mailto:info@loyalcityoptics.com" className="text-white/60 text-sm hover:text-gold transition-colors">
                    info@loyalcityoptics.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">{t('hours_title')}</h3>
                  <p className="text-white/60 text-sm mb-1">{t('hours_weekdays')}</p>
                  <p className="text-white/60 text-sm">{t('hours_friday')}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-8 py-4 rounded-sm transition-colors text-sm tracking-wide"
            >
              <MessageCircle size={20} />
              {t('whatsapp_cta')}
            </a>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-sm overflow-hidden border border-gold/20 min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.1!2d48.0778!3d29.3375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9a0b5ada995b%3A0x63a484391e76dbb!2sSaba%20St%2C%20Salmiya%2C%20Kuwait!5e0!3m2!1sen!2skw!4v1700000000000!5m2!1sen!2skw"
              width="100%"
              height="100%"
              style={{ minHeight: 400, border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Loyal City Optics Location"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
