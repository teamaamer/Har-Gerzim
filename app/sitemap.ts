import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/shipping',
    '/returns',
    '/legal',
    '/privacy',
    '/cookies',
    '/accessibility',
    '/collections/tahini',
    '/collections/hummus',
    '/collections/olive-oil',
  ];

  const locales = ['he', 'en'];
  
  const urls = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }))
  );

  return urls;
}
