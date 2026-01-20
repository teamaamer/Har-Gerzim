import type { ShopifyProduct } from '@/lib/shopify/types';

export function OrganizationJsonLd({ locale }: { locale: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: locale === 'he' ? 'שיווק הר גריזים' : 'Loza Mount Gerizim',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+972-52-273-8783',
      contactType: 'customer service',
      areaServed: 'IL',
      availableLanguage: ['he', 'en'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IL',
      addressLocality: 'Har Bracha',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ProductJsonLd({ product, locale }: { product: ShopifyProduct; locale: string }) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: image?.url,
    offers: {
      '@type': 'Offer',
      price: price.amount,
      priceCurrency: price.currencyCode,
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/products/${product.handle}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
