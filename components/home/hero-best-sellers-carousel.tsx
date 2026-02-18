'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { AutoGlowingEffect } from '@/components/ui/auto-glowing-effect';

interface HeroBestSellersCarouselProps {
  locale: Locale;
  dict: any;
  products: any[];
}

export function HeroBestSellersCarousel({ locale, dict, products }: HeroBestSellersCarouselProps) {
  if (!products || products.length === 0) {
    return null;
  }

  const displayProducts = products.slice(0, 4);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {displayProducts.map((product) => (
          <Link
            key={product.id}
            href={`/${locale}/products/${product.handle}`}
            className="group relative flex flex-col items-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border-2 border-transparent hover:from-white/20 hover:to-white/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gold-500/20 hover:scale-105"
          >
            {/* Auto-rotating glowing border effect */}
            <AutoGlowingEffect 
              spread={30}
              borderWidth={2}
              blur={0}
              speed={3}
            />
            
            {/* Gold border on hover */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-gold-400/0 group-hover:border-gold-400 transition-all duration-300 pointer-events-none" />
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-400/0 to-gold-600/0 group-hover:from-gold-400/10 group-hover:to-gold-600/10 transition-all duration-300 pointer-events-none" />
            
            <div className="relative w-14 h-14 sm:w-24 sm:h-24 bg-white rounded-lg sm:rounded-xl overflow-hidden mb-1.5 sm:mb-3 shadow-md">
              <Image
                src={product.images?.edges?.[0]?.node?.url || product.featuredImage?.url || '/logo.png'}
                alt={product.images?.edges?.[0]?.node?.altText || product.title}
                fill
                className="object-contain p-1.5 sm:p-3 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="relative flex flex-col items-center w-full">
              <h3 className="text-[10px] sm:text-sm font-bold text-white mb-1 sm:mb-2 text-center line-clamp-2 group-hover:text-gold-300 transition-colors leading-tight">
                {product.title}
              </h3>
              <div className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gold-500/20 border border-gold-400/30">
                <span className="text-xs sm:text-base font-bold text-gold-400">
                  {dict.common.currency}{product.priceRange?.minVariantPrice?.amount || '0'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
