import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import '../globals.css';

const GA_ID = 'G-PG5M26T6WP';

const locales = ['en', 'ar'];

export const metadata: Metadata = {
  title: 'Loyal City Optics | Kuwait Premium Eyewear — Since 1998',
  description: "Kuwait's premier optical destination in Salmiya. Eye examinations, premium frames, prescription lenses and contact lenses. Trusted for 26 years.",
  keywords: 'optical Kuwait, eyewear Kuwait, glasses Salmiya, eye examination Kuwait, contact lenses Kuwait',
  icons: {
    icon: '/favicon.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Loyal City Optics Kuwait',
    description: 'Premium eyewear since 1998 — Salmiya, Kuwait',
    url: 'https://loyalcityoptics.com',
    images: ['/logo.png'],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();
  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <head />
      <body className="bg-navy text-white overflow-x-hidden">
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
