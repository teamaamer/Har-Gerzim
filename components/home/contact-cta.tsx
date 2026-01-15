'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { ContactForm } from '@/components/contact-form';

interface ContactCtaProps {
  locale: Locale;
  dict: any;
}

export function ContactCta({ locale, dict }: ContactCtaProps) {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gold-500 to-gold-600 text-navy-900 overflow-hidden">
      <div className="w-full px-4 md:px-6 lg:px-8 relative z-10 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {dict.home.contactCta.title}
            </h2>
            <p className="text-lg md:text-xl text-navy-800 max-w-2xl mx-auto">
              {dict.home.contactCta.subtitle}
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Contact Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6 lg:sticky lg:top-24"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">{dict.home.contactCta.quickContact}</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <Button 
                    asChild 
                    size="lg"
                    className="min-h-[120px] bg-navy-900 hover:bg-navy-800 text-white hover:scale-[1.02] transition-transform shadow-lg hover:shadow-xl rounded-xl"
                  >
                    <a href="tel:0522738783" className="flex flex-col items-center justify-center gap-4 py-8 px-4">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-7 w-7" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-base whitespace-nowrap">{dict.home.contactCta.call}</div>
                        <div className="text-sm text-white/80 mt-1 whitespace-nowrap">052-273-8783</div>
                      </div>
                    </a>
                  </Button>
                  
                  <Button 
                    asChild 
                    size="lg"
                    className="min-h-[120px] bg-green-600 hover:bg-green-700 text-white hover:scale-[1.02] transition-transform shadow-lg hover:shadow-xl rounded-xl"
                  >
                    <a 
                      href="https://wa.me/972522738783" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-4 py-8 px-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-7 w-7" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-base whitespace-nowrap">{dict.home.contactCta.whatsapp}</div>
                        <div className="text-sm text-white/80 mt-1 whitespace-nowrap">{dict.home.contactCta.chatWithUs}</div>
                      </div>
                    </a>
                  </Button>
                </div>
              </div>

              {/* Store Address Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{dict.home.contactCta.ourLocation}</h4>
                    <p className="text-sm text-navy-800 leading-relaxed whitespace-pre-line">
                      {dict.home.contactCta.locationAddress}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactForm locale={locale} dict={dict} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
