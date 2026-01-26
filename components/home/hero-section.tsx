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
    <section className="relative h-screen flex items-start justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden pt-4 pb-2 lg:py-8 lg:items-center">
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
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-2 lg:space-y-3 lg:block"
            >
              {/* Brand Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-600/10 border-2 border-gold-400/40 backdrop-blur-md shadow-lg shadow-gold-500/20 order-1"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse shadow-lg shadow-gold-400/50" />
                <span className="text-gold-300 text-sm font-bold tracking-wide">{dict.home.hero.brandMark}</span>
              </motion.div>

              {/* Heading */}
              <div className="space-y-0.5 lg:space-y-2 order-2">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]"
                  style={{
                    textShadow: '0 2px 20px rgba(251, 191, 36, 0.3), 0 0 40px rgba(251, 191, 36, 0.2)'
                  }}
                >
                  <span className="bg-gradient-to-r from-white via-gold-200 to-gold-100 bg-clip-text text-transparent animate-gradient">
                    {dict.home.hero.title}
                  </span>
                </motion.h1>
              </div>

              {/* Subtitle - Above Image on Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:hidden order-3"
              >
                <p className="text-base md:text-lg text-gold-100 font-medium leading-relaxed px-3 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                  {dict.home.hero.subtitle}
                </p>
              </motion.div>

              {/* Mobile: Row 1 - Image + Years Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:hidden order-4 grid grid-cols-3 gap-2 sm:gap-3"
              >
                {/* Hero Image - 2/3 width */}
                <div className="col-span-2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-700/40 h-full">
                    <div 
                      className="relative p-4 h-full flex items-center justify-center"
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
                      <div className="relative z-10 w-full">
                        <div className="relative aspect-square max-w-[180px] mx-auto">
                          <Image
                            src="/hero-img-v2.png"
                            alt="Loza Mount Gerizim Products"
                            fill
                            sizes="(max-width: 768px) 180px, 250px"
                            className="object-contain drop-shadow-2xl"
                            priority
                            quality={90}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Years Experience Card - 1/3 width */}
                <div className="col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col items-center justify-center gap-2 p-2 rounded-xl bg-white/90 backdrop-blur-md border-2 border-gold-400/50 hover:border-gold-400 hover:bg-white transition-all duration-300 shadow-lg h-full"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Award className="h-5 w-5 text-navy-900" />
                    </div>
                    <span className="text-xs font-bold text-navy-900 text-center leading-tight">{dict.home.hero.trustBullets.yearsExperience}</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Mobile: Row 2 - Carousel Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="lg:hidden order-5"
              >
                <HeroBestSellersCarousel locale={locale} dict={dict} products={products} />
              </motion.div>

              {/* Subtitle - Desktop Only */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden lg:block"
              >
                <p className="text-base md:text-lg text-gold-100 font-medium leading-relaxed px-3 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  {dict.home.hero.subtitle}
                </p>
              </motion.div>

              {/* Best Sellers Carousel - Desktop Only */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="hidden lg:block"
              >
                <HeroBestSellersCarousel locale={locale} dict={dict} products={products} />
              </motion.div>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-row gap-3 order-6 lg:order-3"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 group shadow-2xl shadow-gold-500/50 hover:shadow-gold-500/70 transition-all duration-300 rounded-xl"
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
                    className="w-full bg-white text-navy-900 hover:bg-gray-100 text-sm sm:text-base font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
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
                className="hidden lg:grid grid-cols-3 gap-3"
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
                      className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/90 backdrop-blur-md border-2 border-gold-400/50 hover:border-gold-400 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0 shadow-md">
                        <Icon className="h-6 w-6 text-navy-900" />
                      </div>
                      <span className="text-sm font-bold text-navy-900 text-center leading-tight">{item.text}</span>
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
