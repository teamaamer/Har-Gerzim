'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import type { ShopifyCollection } from '@/lib/shopify/types';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';

interface CategoryProductsProps {
  locale: Locale;
  dict: any;
  collections: ShopifyCollection[];
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
  
  // Debug: Log all collection handles and titles
  console.log('All multi-product collections:', allMultiProductCollections.map(c => ({
    handle: c.handle,
    title: c.title,
    productCount: c.products.edges.length
  })));
  
  // Separate Tahini from other collections (check both handle and title)
  const tahiniCollection = allMultiProductCollections.filter(
    collection => 
      collection.handle.toLowerCase().includes('tahini') || 
      collection.title.toLowerCase().includes('tahini')
  );
  
  const otherMultiProductCollections = allMultiProductCollections.filter(
    collection => 
      !collection.handle.toLowerCase().includes('tahini') && 
      !collection.title.toLowerCase().includes('tahini')
  );
  
  console.log('Tahini collections:', tahiniCollection.map(c => c.title));
  console.log('Other collections:', otherMultiProductCollections.map(c => c.title));
  
  // Put Tahini at the end
  const multiProductCollections = [...otherMultiProductCollections, ...tahiniCollection];
  
  console.log('Final order:', multiProductCollections.map(c => c.title));

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

          {multiProductCollections.map((collection, collectionIndex) => {
            const products = collection.products.edges.map(edge => edge.node);
            
            return (
              <motion.div
                key={collection.handle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: collectionIndex * 0.1 }}
                className="space-y-6"
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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {products.map((product, productIndex) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: productIndex * 0.05 }}
                      className="h-full"
                    >
                      <ProductCard product={product} locale={locale} dict={dict} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
