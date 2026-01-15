'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Heart, Leaf, CheckCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { GradientOrb } from '@/components/decorative/gradient-orb';

interface StorySectionProps {
  locale: Locale;
  dict: any;
}

export function StorySection({ locale, dict }: StorySectionProps) {
  // Combine home story content with full about content
  const fullContent = dict.about?.content || dict.home.story.content;
  const paragraphs = fullContent.split('\n\n');
  
  // Combine all paragraphs into one meaningful summary
  const combinedSummary = paragraphs.join(' ');
  
  const featureCards = [
    { 
      icon: Award, 
      title: dict.home.story.features.quality.title,
      description: dict.home.story.features.quality.description,
      color: 'text-amber-600',
      bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-100',
      iconBg: 'bg-amber-500'
    },
    { 
      icon: Heart, 
      title: dict.home.story.features.tradition.title,
      description: dict.home.story.features.tradition.description,
      color: 'text-rose-600',
      bgColor: 'bg-gradient-to-br from-rose-50 to-pink-100',
      iconBg: 'bg-rose-500'
    },
    { 
      icon: Leaf, 
      title: dict.home.story.features.local.title,
      description: dict.home.story.features.local.description,
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-100',
      iconBg: 'bg-emerald-500'
    },
  ];
  
  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-white via-muted/20 to-white overflow-hidden">
      <GradientOrb color="olive" size="lg" position="bottom-right" />
      
      {/* Animated background elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
      />
      
      <div className="w-full px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.div 
              className="inline-block mb-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="px-4 py-2 rounded-full bg-gold-100 text-gold-700 text-sm font-semibold shadow-sm">
                {dict.home.story.badge}
              </span>
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {dict.about?.title || dict.home.story.title}
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Feature Cards Side */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'he' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {featureCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.3 + index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.03,
                      transition: { duration: 0.3 }
                    }}
                    className={`flex items-start gap-4 p-5 rounded-xl ${card.bgColor} border-2 border-white/50 shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer`}
                  >
                    <div 
                      className={`flex-shrink-0 w-12 h-12 rounded-lg ${card.iconBg} shadow-md flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-base mb-1 ${card.color}`}>
                        {card.title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'he' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900/70 via-navy-800/50 to-transparent z-10 group-hover:from-navy-900/60 transition-all duration-500" />
                <Image
                  src="/HarGerzim.png"
                  alt={dict.home.story.imageCaption || 'Har Bracha - Gerizim'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Image Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-1 bg-gold-500 rounded-full" />
                    <CheckCircle className="h-5 w-5 text-gold-400" />
                  </div>
                  <p className="text-white text-xl font-bold mb-2">
                    {dict.home.story.imageCaption || 'Har Bracha - Gerizim'}
                  </p>
                  <p className="text-white/80 text-sm">
                    {dict.home.story.subtitle}
                  </p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-gold-400 to-gold-600 rounded-3xl -z-10 blur-2xl opacity-30" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-navy-400 to-navy-600 rounded-3xl -z-10 blur-2xl opacity-20" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
