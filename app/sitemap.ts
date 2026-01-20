import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { getAllCollections } from '@/lib/shopify';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const collections = await getAllCollections(50, 'en');
  
  const staticRoutes = [
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
  ];

  const collectionRoutes = collections.map(collection => `/collections/${collection.handle}`);
  const allRoutes = [...staticRoutes, ...collectionRoutes];

  const supportedLocales = ['he', 'en', 'ar'];
  
  const urls = supportedLocales.flatMap((locale) =>
    allRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : route.startsWith('/collections') ? 0.9 : 0.8,
    }))
  );

  return urls;
}
