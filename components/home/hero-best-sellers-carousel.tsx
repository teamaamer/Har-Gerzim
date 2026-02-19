'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { AutoGlowingEffect } from '@/components/ui/auto-glowing-effect';

interface HeroBestSellersCarouselProps {
  locale: Locale;
  dict: any;
  products: any[];
}

const categories = [
  { name: 'Zaatar', image: '/categories/Zaatar.png', handle: 'zaatar' },
  { name: 'Olive Oil', image: '/categories/Olive Oil.png', handle: 'olive-oil' },
  { name: 'Halawa', image: '/categories/Halawa.png', handle: 'halawa' },
  { name: 'Tahini', image: '/categories/Tahini.png', handle: 'tahini' },
  { name: 'Coffee', image: '/categories/Coffee.jpeg', handle: 'coffee' },
  { name: 'Alcohol', image: '/categories/Alcohol.png', handle: 'alcohol' },
];

export function HeroBestSellersCarousel({ locale, dict, products }: HeroBestSellersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (!products || products.length === 0) {
    return null;
  }

  const displayProducts = products.slice(0, 4);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full">
      {/* Mobile: Category Carousel */}
      <div className="lg:hidden space-y-2">
        {/* Categories */}
        <div className="relative">
          <h2 className="text-base font-bold text-gold-300 mb-2 px-1">
            {dict.home.bestSellers?.title || 'Best Sellers'}
          </h2>
          
          <div className="relative">
            <div 
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => (
                <Link
                  key={category.handle}
                  href={`/${locale}/collections/${category.handle}`}
                  className="group relative flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border-2 border-white/20 hover:border-gold-400/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-gold-500/30 active:scale-95 flex-shrink-0 w-[30%] snap-center"
                >
                  <AutoGlowingEffect 
                    spread={35}
                    borderWidth={2}
                    blur={0}
                    speed={3}
                  />
                  
                  <div className="aspect-square relative bg-white rounded-xl overflow-hidden mb-2 shadow-lg w-full ring-2 ring-white/10 group-hover:ring-gold-400/30 transition-all duration-300">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="relative flex flex-col items-center w-full">
                    <h3 className="text-xs font-bold text-white text-center group-hover:text-gold-300 transition-colors drop-shadow-lg">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Best Seller Products - 4x4 Grid */}
        <div>
          <h2 className="text-base font-bold text-gold-300 text-center mb-2">
            {dict.home.bestSellers?.productsTitle || 'Featured Products'}
          </h2>
          
          <div className="grid grid-cols-2 gap-2">
            {displayProducts.map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/products/${product.handle}`}
                className="group relative flex flex-col items-center p-2 rounded-xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border-2 border-transparent hover:from-white/20 hover:to-white/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gold-500/20 hover:scale-105"
              >
                <AutoGlowingEffect 
                  spread={30}
                  borderWidth={2}
                  blur={0}
                  speed={3}
                />
                
                <div className="absolute inset-0 rounded-xl border-2 border-gold-400/0 group-hover:border-gold-400 transition-all duration-300 pointer-events-none" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold-400/0 to-gold-600/0 group-hover:from-gold-400/10 group-hover:to-gold-600/10 transition-all duration-300 pointer-events-none" />
                
                <div className="aspect-square relative bg-white rounded-lg overflow-hidden mb-1.5 shadow-md w-full">
                  <Image
                    src={product.images?.edges?.[0]?.node?.url || product.featuredImage?.url || '/logo.png'}
                    alt={product.images?.edges?.[0]?.node?.altText || product.title}
                    fill
                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="relative flex flex-col items-center w-full">
                  <h3 className="text-[10px] font-bold text-white mb-1 text-center line-clamp-2 group-hover:text-gold-300 transition-colors leading-tight">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-500/20 border border-gold-400/30">
                    <span className="text-xs font-bold text-gold-400">
                      {dict.common.currency}{product.priceRange?.minVariantPrice?.amount || '0'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Product Grid */}
      <div className="hidden lg:grid grid-cols-4 gap-4">
        {displayProducts.map((product) => (
          <Link
            key={product.id}
            href={`/${locale}/products/${product.handle}`}
            className="group relative flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border-2 border-transparent hover:from-white/20 hover:to-white/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gold-500/20 hover:scale-105"
          >
            <AutoGlowingEffect 
              spread={30}
              borderWidth={2}
              blur={0}
              speed={3}
            />
            
            <div className="absolute inset-0 rounded-2xl border-2 border-gold-400/0 group-hover:border-gold-400 transition-all duration-300 pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/0 to-gold-600/0 group-hover:from-gold-400/10 group-hover:to-gold-600/10 transition-all duration-300 pointer-events-none" />
            
            <div className="aspect-square relative bg-white rounded-xl overflow-hidden mb-3 shadow-md w-full">
              <Image
                src={product.images?.edges?.[0]?.node?.url || product.featuredImage?.url || '/logo.png'}
                alt={product.images?.edges?.[0]?.node?.altText || product.title}
                fill
                className="object-contain p-3 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="relative flex flex-col items-center w-full">
              <h3 className="text-sm font-bold text-white mb-2 text-center line-clamp-2 group-hover:text-gold-300 transition-colors leading-tight">
                {product.title}
              </h3>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/30">
                <span className="text-base font-bold text-gold-400">
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
