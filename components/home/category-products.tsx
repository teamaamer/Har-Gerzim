'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import type { ShopifyCollection } from '@/lib/shopify/types';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';

interface CategoryProductsProps {
  locale: Locale;
  dict: any;
  collections: ShopifyCollection[];
}

function CategoryCarousel({ collection, locale, dict, collectionIndex }: { collection: ShopifyCollection; locale: Locale; dict: any; collectionIndex: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const products = collection.products.edges.map(edge => edge.node);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: collectionIndex * 0.1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-navy-900 mb-2">
            {collection.title}
          </h3>
          {collection.description && (
            <p className="text-sm md:text-base text-muted-foreground">
              {collection.description}
            </p>
          )}
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white flex-shrink-0 text-xs md:text-sm"
        >
          <Link href={`/${locale}/collections/${collection.handle}`}>
            {dict.home.collections?.viewAll || 'View All'}
            <ArrowRight className={`h-3 w-3 md:h-4 md:w-4 ${locale === 'he' || locale === 'ar' ? 'mr-2' : 'ml-2'}`} />
          </Link>
        </Button>
      </div>

      {/* Carousel */}
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-navy-900/90 hover:bg-navy-900 text-white shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-navy-900/90 hover:bg-navy-900 text-white shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, productIndex) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: productIndex * 0.05 }}
              className="flex-shrink-0 w-[85%] md:w-[45%] lg:w-[23%] snap-center"
            >
              <ProductCard product={product} locale={locale} dict={dict} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function CategoryProducts({ locale, dict, collections }: CategoryProductsProps) {
  const collectionsWithProducts = collections.filter(
    collection => collection.products?.edges && collection.products.edges.length > 0
  );

  if (collectionsWithProducts.length === 0) {
    return null;
  }

  const singleProductCollections = collectionsWithProducts.filter(
    collection => collection.products.edges.length === 1
  );
  
  const allMultiProductCollections = collectionsWithProducts.filter(
    collection => collection.products.edges.length > 1
  );
  
  // Separate small collections (1-2 products) that should be grouped together
  const smallCollections = collectionsWithProducts.filter(
    collection => collection.products.edges.length <= 2
  );
  
  // Separate Tahini from other collections (check both handle and title)
  const tahiniCollection = allMultiProductCollections.filter(
    collection => 
      collection.handle.toLowerCase().includes('tahini') || 
      collection.title.toLowerCase().includes('tahini')
  );
  
  const otherMultiProductCollections = allMultiProductCollections.filter(
    collection => 
      !collection.handle.toLowerCase().includes('tahini') && 
      !collection.title.toLowerCase().includes('tahini') &&
      collection.products.edges.length > 2
  );
  
  // Put Tahini at the end
  const multiProductCollections = [...otherMultiProductCollections, ...tahiniCollection];
  
  // Determine if we should group small collections together
  // This happens when we have small collections (1-2 products each)
  const shouldGroupSmallCollections = smallCollections.length > 0 && 
    smallCollections.reduce((sum, c) => sum + c.products.edges.length, 0) <= 4;

  return (
    <section className="relative bg-gradient-to-b from-muted/30 to-white py-16 md:py-24">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
            {dict.home.categoryProducts?.title || 'Featured Products by Category'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {dict.home.categoryProducts?.subtitle || 'Discover our top products from each collection'}
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* If we have small collections (1-2 products each), display them together in one row */}
          {shouldGroupSmallCollections ? (
            <>
              {/* First row: All small collections (1-2 products each) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {/* Render all products from small collections */}
                  {smallCollections.map((collection, collectionIndex) => {
                    return collection.products.edges.map((edge, productIndex) => {
                      const product = edge.node;
                      const isFirstProduct = productIndex === 0;
                      
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: (collectionIndex + productIndex) * 0.05 }}
                          className="flex flex-col h-full w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] max-w-sm"
                        >
                          {isFirstProduct && (
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-navy-900 line-clamp-2 flex-1">
                                {collection.title}
                              </h3>
                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white flex-shrink-0 text-xs px-2 h-7 whitespace-nowrap"
                              >
                                <Link href={`/${locale}/collections/${collection.handle}`}>
                                  {dict.home.collections?.viewAll || 'View All'}
                                  <ArrowRight className={`h-3 w-3 ${locale === 'he' || locale === 'ar' ? 'mr-1' : 'ml-1'}`} />
                                </Link>
                              </Button>
                            </div>
                          )}
                          {!isFirstProduct && <div className="mb-3 h-[36px]"></div>}
                          <div className="flex-1">
                            <ProductCard product={product} locale={locale} dict={dict} />
                          </div>
                        </motion.div>
                      );
                    });
                  })}
                </div>
              </motion.div>

              {/* Remaining multi-product categories (more than 2 products) */}
              {multiProductCollections.map((collection, collectionIndex) => (
                <CategoryCarousel
                  key={collection.handle}
                  collection={collection}
                  locale={locale}
                  dict={dict}
                  collectionIndex={collectionIndex + 1}
                />
              ))}
            </>
          ) : (
            <>
              {/* Default layout: single-product categories separate from multi-product */}
              {singleProductCollections.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-7xl mx-auto">
                      {singleProductCollections.map((collection, index) => {
                      const product = collection.products.edges[0].node;
                      
                      return (
                        <motion.div
                          key={collection.handle}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex flex-col h-full w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] max-w-sm"
                        >
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-navy-900 line-clamp-2 flex-1">
                              {collection.title}
                            </h3>
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white flex-shrink-0 text-xs px-2 h-7 whitespace-nowrap"
                            >
                              <Link href={`/${locale}/collections/${collection.handle}`}>
                                {dict.home.collections?.viewAll || 'View All'}
                                <ArrowRight className={`h-3 w-3 ${locale === 'he' || locale === 'ar' ? 'mr-1' : 'ml-1'}`} />
                              </Link>
                            </Button>
                          </div>
                          <div className="flex-1">
                            <ProductCard product={product} locale={locale} dict={dict} />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {multiProductCollections.map((collection, collectionIndex) => (
                <CategoryCarousel
                  key={collection.handle}
                  collection={collection}
                  locale={locale}
                  dict={dict}
                  collectionIndex={collectionIndex}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
