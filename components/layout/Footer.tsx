'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+96500000000';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <footer className="bg-[#060e1a] border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top row */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden ring-2 ring-gold/30">
              <Image src="/logo.png" alt="Logo" width={48} height={48} className="object-contain scale-90" />
            </div>
            <h2 className="font-playfair text-2xl text-gold tracking-widest uppercase">
              LOYAL CITY OPTICS
            </h2>
          </div>
          <p className="text-white/50 text-sm">{t('footer.tagline')}</p>
          <div className="w-16 h-px bg-gold mx-auto mt-4" />
        </div>

        {/* 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Shop */}
          <div>
            <h3 className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              {t('footer.shop')}
            </h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>Loyal City Optics</li>
              <li>{t('footer.address')}</li>
              <li>{t('footer.since')}</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              {t('footer.services')}
            </h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <Link href={`/${locale}/services`} className="hover:text-gold transition-colors">
                  {t('services.eye_exam')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-gold transition-colors">
                  {t('services.lenses')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-gold transition-colors">
                  {t('services.frames')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-gold transition-colors">
                  {t('services.sunglasses')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              {t('footer.hours')}
            </h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 shrink-0 text-gold/50" />
                <span>Sat–Thu: 9am – 10pm</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 shrink-0 text-gold/50" />
                <span>Fri: 2pm – 10pm</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3 text-white/60 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-gold/50 shrink-0" />
                <span>Salmiya, Kuwait</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gold/50 shrink-0" />
                <span>+965 XXXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={14} className="text-gold/50 shrink-0" />
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold/50 shrink-0" />
                <a href="mailto:info@loyalcityoptics.com" className="hover:text-gold transition-colors">
                  info@loyalcityoptics.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">{t('footer.rights')}</p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold text-white/50 transition-all text-xs font-bold"
            >
              f
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold text-white/50 transition-all text-xs font-bold"
            >
              IG
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-[#25D366] hover:text-[#25D366] text-white/50 transition-all text-xs font-bold"
            >
              W
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
