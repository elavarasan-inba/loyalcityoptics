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
  title: 'Loyal City Optics Salmiya Kuwait | Best Optical Shop — Since 1998',
  description: "Loyal City Optics — Kuwait's trusted optical shop in Salmiya since 1998. Eye examinations, prescription glasses, premium frames, contact lenses & sunglasses. Near Edee Super Market, Saba Street Block 10.",
  keywords: 'optical shop Salmiya, glasses Kuwait, eyewear Kuwait, eye exam Salmiya, contact lenses Kuwait, prescription glasses Kuwait, sunglasses Kuwait, نظارات السالمية, نظارات الكويت, محل نظارات السالمية, فحص نظر الكويت, loyal city optics, city optics salmiya',
  authors: [{ name: 'Loyal City Optics' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://loyalcityoptics.com',
    languages: {
      'en': 'https://loyalcityoptics.com/en',
      'ar': 'https://loyalcityoptics.com/ar',
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Loyal City Optics — Best Optical Shop in Salmiya, Kuwait',
    description: 'Premium eyewear since 1998. Eye exams, frames, lenses & sunglasses. Saba Street, Salmiya, Kuwait.',
    url: 'https://loyalcityoptics.com',
    siteName: 'Loyal City Optics',
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'Loyal City Optics Logo' }],
    locale: 'en_US',
    type: 'website',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Optician',
  name: 'Loyal City Optics',
  alternateName: 'City Optics Salmiya',
  url: 'https://loyalcityoptics.com',
  logo: 'https://loyalcityoptics.com/logo.png',
  image: 'https://loyalcityoptics.com/logo.png',
  description: "Kuwait's premier optical shop in Salmiya since 1998. Eye examinations, prescription glasses, premium frames, contact lenses and sunglasses.",
  telephone: '+96525620966',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Saba Street #118, Block 10, Near Gulf British Academy & Edee Super Market',
    addressLocality: 'Salmiya',
    addressCountry: 'KW',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.3399,
    longitude: 48.0793,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '21:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '10:00',
      closes: '21:30',
    },
  ],
  sameAs: [
    'https://www.instagram.com/cityoptics_salmiya',
    'https://www.facebook.com/cityopticskw',
  ],
  priceRange: '$$',
  currenciesAccepted: 'KWD',
  paymentAccepted: 'Cash, Credit Card',
  areaServed: 'Kuwait',
  foundingDate: '1998',
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
        {/* Google Analytics */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
        {/* Local Business Structured Data */}
        <Script id="local-business-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(localBusinessSchema)}
        </Script>
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
