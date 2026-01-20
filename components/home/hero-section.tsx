'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, ShieldCheck, Truck, MapPin } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { TopographicLines } from '@/components/decorative/topographic-lines';

interface HeroSectionProps {
  locale: Locale;
  dict: any;
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden pt-0 pb-8 lg:py-0">
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
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4 lg:space-y-6 lg:block"
            >
              {/* Brand Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm order-1"
              >
                <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-gold-400 text-sm font-semibold">{dict.home.hero.brandMark}</span>
              </motion.div>

              {/* Heading */}
              <div className="space-y-2 lg:space-y-3 order-2">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
                >
                  <span className="bg-gradient-to-r from-white via-gold-100 to-white bg-clip-text text-transparent">
                    {dict.home.hero.title}
                  </span>
                </motion.h1>
              </div>

              {/* Subtitle - Above Image on Mobile */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-gold-200 font-light leading-relaxed lg:hidden order-3"
              >
                {dict.home.hero.subtitle}
              </motion.p>

              {/* Subtitle - Desktop Only */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-gold-200 font-light leading-relaxed hidden lg:block"
              >
                {dict.home.hero.subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-row gap-3 order-5 lg:order-3"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-sm sm:text-base px-4 sm:px-6 py-4 sm:py-5 group shadow-2xl shadow-gold-500/50 hover:shadow-gold-500/70 transition-all duration-300 rounded-xl"
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
                    asChild 
                    size="lg" 
                    className="w-full bg-white text-navy-900 hover:bg-gray-100 text-sm sm:text-base font-semibold px-4 sm:px-6 py-4 sm:py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Link href={`/${locale}#about`}>
                      {dict.home.hero.cta.secondary}
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Hero Image - Mobile Only */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative lg:hidden order-4"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-700/40">
                  <div 
                    className="relative p-4 sm:p-6"
                    style={{
                      background: 'radial-gradient(ellipse at center top, #f4d4a0 0%, #e8b76b 25%, #d4a054 50%, #c08a3d 75%, #a67233 100%)',
                    }}
                  >
                    <div 
                      className="absolute inset-0 opacity-10 mix-blend-overlay"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: '150px 150px'
                      }}
                    />
                    <div className="relative z-10">
                      <div className="relative max-w-[250px] mx-auto">
                        <Image
                          src="/hero-img-v2.png"
                          alt="Loza Mount Gerizim Products"
                          width={500}
                          height={500}
                          className="w-full h-auto drop-shadow-2xl rounded-2xl"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-2 sm:gap-3 order-6"
              >
                {[
                  { icon: MapPin, text: dict.home.hero.trustBullets.israelDelivery },
                  { icon: Package, text: dict.home.hero.trustBullets.deliveryTime },
                  { icon: ShieldCheck, text: dict.home.hero.trustBullets.secureCheckout }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-gold-500/30 transition-colors duration-300"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-200 text-center sm:text-left">{item.text}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mt-8 lg:mt-0 hidden lg:block"
          >
            {/* Gold Card with Radial Gradient */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-700/40">
              {/* Smooth Radial Gold Gradient Background */}
              <div 
                className="relative p-4 sm:p-6 md:p-10"
                style={{
                  background: 'radial-gradient(ellipse at center top, #f4d4a0 0%, #e8b76b 25%, #d4a054 50%, #c08a3d 75%, #a67233 100%)',
                }}
              >
                {/* Subtle Texture Overlay */}
                <div 
                  className="absolute inset-0 opacity-10 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '150px 150px'
                  }}
                />
                
                {/* Content Container */}
                <div className="relative z-10">
                  {/* Hero Image Container */}
                  <div className="relative max-w-[250px] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                    <Image
                      src="/hero-img-v2.png"
                      alt="Loza Mount Gerizim Products"
                      width={500}
                      height={500}
                      className="w-full h-auto drop-shadow-2xl rounded-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
