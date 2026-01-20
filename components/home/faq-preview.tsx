'use client';

import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { useState } from 'react';

interface FaqPreviewProps {
  locale: Locale;
  dict: any;
}

export function FaqPreview({ locale, dict }: FaqPreviewProps) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  
  const faqs = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
    { q: dict.faq.q5, a: dict.faq.a5 },
    { q: dict.faq.q6, a: dict.faq.a6 },
    { q: dict.faq.q7, a: dict.faq.a7 },
    { q: dict.faq.q8, a: dict.faq.a8 },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900">
            {dict.home.faqPreview.title}
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            {dict.home.faqPreview.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="cursor-pointer perspective-1000 min-h-[140px]"
              onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                  flippedIndex === index ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of card - Question */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="w-full p-5 rounded-lg border-2 border-gray-200 bg-white hover:border-gold-300 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-bold text-base text-navy-900 leading-tight">
                        {faq.q}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-3">{dict.home.faqPreview.clickToSeeAnswer}</p>
                  </div>
                </div>

                {/* Back of card - Answer */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="w-full p-5 rounded-lg border-2 border-gold-500 bg-gold-50/50 shadow-lg">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {faq.a}
                    </p>
                    <p className="text-xs text-gray-500 text-center mt-3">{dict.home.faqPreview.clickToSeeQuestion}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
