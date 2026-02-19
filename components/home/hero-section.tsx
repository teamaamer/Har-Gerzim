'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Award, Truck, MapPin } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { TopographicLines } from '@/components/decorative/topographic-lines';
import { HeroBestSellersCarousel } from '@/components/home/hero-best-sellers-carousel';

interface HeroSectionProps {
  locale: Locale;
  dict: any;
  products?: any[];
}

export function HeroSection({ locale, dict, products = [] }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen lg:h-auto lg:min-h-0 flex items-start justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden py-2 lg:py-12 lg:items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/newbg.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>
      
      {/* Decorative Elements */}
      <TopographicLines color="#ffffff" density="medium" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="w-full px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-1 lg:space-y-2 lg:block w-full"
            >
              {/* Brand Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-600/10 border-2 border-gold-400/40 backdrop-blur-md shadow-lg shadow-gold-500/20 order-1"
              >
                <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse shadow-lg shadow-gold-400/50" />
                <span className="text-gold-300 text-xs font-bold tracking-wide">{dict.home.hero.brandMark}</span>
              </motion.div>

              {/* Heading */}
              <div className="space-y-0 lg:space-y-1 order-2">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl sm:text-5xl md:text-4xl lg:text-4xl font-extrabold tracking-tight leading-[1.1]"
                  style={{
                    textShadow: '0 2px 20px rgba(251, 191, 36, 0.3), 0 0 40px rgba(251, 191, 36, 0.2)'
                  }}
                >
                  <span className="bg-gradient-to-r from-white via-gold-200 to-gold-100 bg-clip-text text-transparent animate-gradient">
                    {dict.home.hero.title}
                  </span>
                </motion.h1>
              </div>

              {/* Best Sellers Carousel - All Screens */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="order-3"
              >
                <HeroBestSellersCarousel locale={locale} dict={dict} products={products} />
              </motion.div>

              {/* Subtitle - Desktop Only */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="order-4 hidden lg:block"
              >
                <p className="text-base md:text-lg lg:text-base text-gold-100 font-medium leading-relaxed px-3 py-2 rounded-lg lg:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  {dict.home.hero.subtitle}
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-row gap-2 order-6 lg:order-3"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Button 
                    asChild 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-xs px-3 py-1.5 group shadow-2xl shadow-gold-500/50 hover:shadow-gold-500/70 transition-all duration-300 rounded-xl"
                  >
                    <Link href={`/${locale}/collections/all`}>
                      {dict.home.hero.cta.primary}
                      <ArrowRight className={`${locale === 'he' ? 'mr-2' : 'ml-2'} h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform`} />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Button 
                    size="lg" 
                    onClick={() => {
                      const aboutSection = document.getElementById('about');
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="w-full bg-white text-navy-900 hover:bg-gray-100 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {dict.home.hero.cta.secondary}
                  </Button>
                </motion.div>
              </motion.div>


              {/* Trust Indicators - Desktop Only */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="hidden lg:grid grid-cols-3 gap-2"
              >
                {[
                  { icon: MapPin, text: dict.home.hero.trustBullets.israelDelivery },
                  { icon: Package, text: dict.home.hero.trustBullets.deliveryTime },
                  { icon: Award, text: dict.home.hero.trustBullets.yearsExperience }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/90 backdrop-blur-md border-2 border-gold-400/50 hover:border-gold-400 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0 shadow-md">
                        <Icon className="h-5 w-5 text-navy-900" />
                      </div>
                      <span className="text-sm font-bold text-navy-900 text-center leading-tight">{item.text}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
