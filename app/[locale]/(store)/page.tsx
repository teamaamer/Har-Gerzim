import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getProducts } from '@/lib/shopify';
import type { Locale } from '@/lib/i18n/config';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Package, MapPin, Award } from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const products = await getProducts(undefined, 8);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
        <div className="absolute inset-0 bg-[url('/logo.png')] opacity-5 bg-center bg-no-repeat bg-contain" />
        <div className="container relative py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-base px-4 py-2">
              {dict.home.trust.israelOnly}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {dict.home.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {dict.home.hero.subtitle}
            </p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {dict.home.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link href={`/${locale}/collections/all`}>
                  {dict.common.shopNow}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white/10">
                <Link href={`/${locale}/about`}>
                  {dict.common.ourStory}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.home.collections.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: dict.home.collections.tahini, handle: 'tahini', image: '/logo.png' },
              { name: dict.home.collections.halawa, handle: 'halawa', image: '/logo.png' },
              { name: dict.home.collections.oliveOil, handle: 'olive-oil', image: '/logo.png' },
            ].map((collection) => (
              <Link
                key={collection.handle}
                href={`/${locale}/collections/${collection.handle}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square relative bg-gradient-to-br from-navy-50 to-gold-50">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      {products.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {dict.home.bestSellers.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} dict={dict} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Section */}
      <section className="py-12 bg-navy-900 text-white">
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-gold-400" />
              <span className="text-sm">{dict.home.trust.delivery}</span>
            </div>
            <div className="hidden sm:block text-gold-400">•</div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gold-400" />
              <span className="text-sm">{dict.home.trust.israelOnly}</span>
            </div>
            <div className="hidden sm:block text-gold-400">•</div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-gold-400" />
              <span className="text-sm">{dict.home.trust.secureCheckout}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
