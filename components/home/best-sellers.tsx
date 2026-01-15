'use client';

import { motion } from 'framer-motion';
import { ProductCard } from '@/components/products/product-card';
import type { Locale } from '@/lib/i18n/config';
import { GradientOrb } from '@/components/decorative/gradient-orb';

interface BestSellersProps {
  locale: Locale;
  dict: any;
  products: any[];
}

export function BestSellers({ locale, dict, products }: BestSellersProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="relative min-h-screen flex items-center bg-muted/30 overflow-hidden">
      <GradientOrb color="navy" size="md" position="bottom-left" />
      <div className="w-full px-4 md:px-6 lg:px-8 relative z-10 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900">
            {dict.home.bestSellers.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} locale={locale} dict={dict} />
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
