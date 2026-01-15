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
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Call Card */}
                  <a 
                    href="tel:0522738783" 
                    className="bg-navy-900 hover:bg-navy-800 text-white rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{dict.home.contactCta.call}</div>
                      <div className="text-sm text-white/90 mt-1">052-273-8783</div>
                    </div>
                  </a>
                  
                  {/* WhatsApp Card */}
                  <a 
                    href="https://wa.me/972522738783" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-6 w-6 fill-white">
                        <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/>
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{dict.home.contactCta.whatsapp}</div>
                      <div className="text-sm text-white/90 mt-1">{dict.home.contactCta.chatWithUs}</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Store Address Card */}
              <div className="bg-gold-400/30 backdrop-blur-sm rounded-xl p-6 border border-gold-600/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-navy-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-navy-900">{dict.home.contactCta.ourLocation}</h4>
                    <p className="text-sm text-navy-900 leading-relaxed whitespace-pre-line">
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
