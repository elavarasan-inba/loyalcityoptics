import { MetadataRoute } from 'next';

const BASE_URL = 'https://loyalcityoptics.com';
const locales = ['en', 'ar'];
const pages = ['', '/about', '/services', '/gallery', '/contact', '/book'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
