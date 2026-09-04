'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isRtl = locale === 'ar';
  const otherLocale = locale === 'en' ? 'ar' : 'en';

  // Build the alternate locale path
  const switchLocalePath = () => {
    const segments = pathname.split('/');
    segments[1] = otherLocale;
    return segments.join('/') || `/${otherLocale}`;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/gallery`, label: t('gallery') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 shrink-0 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Loyal City Optics Logo"
                width={48}
                height={48}
                className="object-contain drop-shadow-[0_0_6px_rgba(201,168,76,0.4)]"
              />
            </div>
            <span className={`text-gold font-playfair font-bold text-base tracking-widest uppercase hidden sm:block ${isRtl ? 'font-tajawal' : ''}`}>
              LOYAL CITY OPTICS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  pathname === link.href ? 'text-gold' : 'text-white/80 hover:text-gold'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle */}
            <Link
              href={switchLocalePath()}
              className="text-sm font-medium text-gold/70 hover:text-gold transition-colors border border-gold/30 px-3 py-1 rounded-sm hover:border-gold"
            >
              {locale === 'en' ? 'عربي' : 'EN'}
            </Link>

            <Link
              href={`/${locale}/book`}
              className="bg-gold text-navy text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-gold-light transition-colors"
            >
              {t('book')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href={switchLocalePath()}
              className="text-sm text-gold border border-gold/30 px-2 py-1 rounded-sm"
            >
              {locale === 'en' ? 'عربي' : 'EN'}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-gold transition-colors p-1"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-navy/98 backdrop-blur-md border-t border-gold/20 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-gold bg-gold/10'
                      : 'text-white/80 hover:text-gold hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/book`}
                onClick={() => setMenuOpen(false)}
                className="mx-4 mt-3 bg-gold text-navy text-sm font-semibold px-5 py-3 rounded-sm text-center hover:bg-gold-light transition-colors"
              >
                {t('book')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
