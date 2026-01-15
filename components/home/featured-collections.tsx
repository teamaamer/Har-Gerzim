'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { OliveParticles } from '@/components/decorative/olive-particles';
import { GradientOrb } from '@/components/decorative/gradient-orb';

interface FeaturedCollectionsProps {
  locale: Locale;
  dict: any;
}

const collections = [
  { handle: 'tahini', image: '/categories/Tahini.png' },
  { handle: 'hummus', image: '/categories/Halawa.png' },
  { handle: 'olive-oil', image: '/categories/Olive Oil.png' },
  { handle: 'coffee', image: '/categories/Coffee.jpeg' },
];

export function FeaturedCollections({ locale, dict }: FeaturedCollectionsProps) {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-white to-muted/30 overflow-hidden">
      <OliveParticles count={6} color="#92400e" />
      <GradientOrb color="gold" size="lg" position="top-right" />
      <div className="w-full px-4 md:px-6 lg:px-8 relative z-10 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
            {dict.home.collections.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => {
            const collectionKey = collection.handle.replace('-', '');
            const name = dict.home.collections[collectionKey === 'oliveoil' ? 'oliveOil' : collectionKey];
            const desc = dict.home.collections[`${collectionKey === 'oliveoil' ? 'oliveOil' : collectionKey}Desc`];
            
            return (
              <motion.div
                key={collection.handle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Link
                  href={`/${locale}/collections/${collection.handle}`}
                  className="group flex flex-col h-full relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-900/5 to-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="aspect-square relative bg-gradient-to-br from-navy-50 to-gold-50/50 flex-shrink-0">
                    <Image
                      src={collection.image}
                      alt={name}
                      fill
                      className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6 relative flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">
                      {name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 flex-grow">
                      {desc}
                    </p>
                    <div className="flex items-center text-gold-600 font-semibold text-sm group-hover:gap-2 transition-all mt-auto">
                      <span>{dict.home.collections.explore}</span>
                      <ArrowRight className={`h-4 w-4 ${locale === 'he' ? 'mr-1' : 'ml-1'} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-gold-400/50 transition-all duration-300" />
                </Link>
              </motion.div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
