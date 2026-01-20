'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, MapPin, RotateCcw, ShieldAlert, CheckCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { TopographicLines } from '@/components/decorative/topographic-lines';

interface TrustPoliciesProps {
  locale: Locale;
  dict: any;
}

const policies = [
  { 
    key: 'shipping', 
    icon: Package,
    getContent: (dict: any) => [
      dict.shipping?.israelOnly,
      dict.shipping?.deliveryTime,
      dict.shipping?.businessDays,
      dict.shipping?.cost,
      dict.shipping?.pickup,
    ].filter(Boolean)
  },
  { 
    key: 'returns', 
    icon: RotateCcw,
    getContent: (dict: any) => [
      dict.returns?.consumerLaw,
      dict.returns?.howToCancel,
      dict.returns?.cancellationFee,
      dict.returns?.refund,
      dict.returns?.condition,
    ].filter(Boolean)
  },
  { 
    key: 'pickup', 
    icon: MapPin,
    getContent: (dict: any) => [
      dict.shipping?.pickup,
      dict.common?.phone + ': 052-2738783',
      dict.common?.address,
    ].filter(Boolean)
  },
];

export function TrustPolicies({ locale, dict }: TrustPoliciesProps) {
  return (
    <section className="relative py-16 md:py-24 bg-navy-900 text-white overflow-hidden">
      <TopographicLines color="#f59e0b" density="medium" />
      <div className="w-full px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <Link href={`/${locale}/legal`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 hover:text-gold-400 transition-colors cursor-pointer">
                {dict.home.trustPolicies.title}
              </h2>
            </Link>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {dict.home.trustPolicies.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {policies.map((policy, index) => {
              const Icon = policy.icon;
              const content = dict.home.trustPolicies[policy.key];
              const detailedContent = policy.getContent(dict);
              
              return (
                <motion.div
                  key={policy.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group"
                >
                  <div className="h-full p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-gold-500/20 hover:border-gold-500/40 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-gold-500/10">
                    <div className="flex flex-col space-y-6">
                      {/* Header */}
                      <div className="flex items-center gap-4 pb-4 border-b border-gold-500/10">
                        <div className="w-16 h-16 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-8 w-8 text-gold-400" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {content.title}
                        </h3>
                      </div>
                      
                      {/* Content Grid */}
                      <div className="grid grid-cols-1 gap-4">
                        {detailedContent.map((text, idx) => (
                          <div key={idx} className="flex items-start gap-3 group/item">
                            <CheckCircle className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                            <p className="text-sm md:text-base text-gray-300 leading-relaxed flex-1">
                              {text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
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
