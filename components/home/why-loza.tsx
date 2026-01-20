'use client';

import { motion } from 'framer-motion';
import { Award, Heart, MapPin, Gift, Sparkles } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { TopographicLines } from '@/components/decorative/topographic-lines';
import { OliveParticles } from '@/components/decorative/olive-particles';

interface WhyLozaProps {
  locale: Locale;
  dict: any;
}

const icons = {
  quality: Award,
  tradition: Heart,
  local: MapPin,
  gift: Gift,
};

export function WhyLoza({ locale, dict }: WhyLozaProps) {
  const pillars = [
    { key: 'quality', icon: icons.quality, gradient: 'from-gold-400 to-gold-600', tilt: 'group-hover:rotate-2' },
    { key: 'tradition', icon: icons.tradition, gradient: 'from-red-400 to-red-600', tilt: 'group-hover:-rotate-1' },
    { key: 'local', icon: icons.local, gradient: 'from-green-400 to-green-600', tilt: 'group-hover:rotate-1' },
    { key: 'gift', icon: icons.gift, gradient: 'from-purple-400 to-purple-600', tilt: 'group-hover:-rotate-2' },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-navy-900 overflow-hidden">
      <TopographicLines color="#f59e0b" density="low" />
      <OliveParticles count={6} color="#f59e0b" />
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="w-full px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <span className="text-gold-400 text-sm font-semibold">{dict.home.whyLoza.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {dict.home.whyLoza.title}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {dict.home.whyLoza.subtitle}
            </p>
          </motion.div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const content = dict.home.whyLoza[pillar.key];
              
              return (
                <motion.div
                  key={pillar.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Card */}
                  <div className={`relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gold-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10 hover:-translate-y-2 ${pillar.tilt} text-center`}>
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <div className="relative mb-6 flex justify-center">
                      {/* Icon glow effect - behind */}
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br ${pillar.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10`} />
                      <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 z-10`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                        {content.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-300">
                        {content.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.gradient} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
