import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';

interface FooterProps {
  locale: Locale;
  dict: any;
}

export function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-b from-navy-900 to-navy-950 text-white">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-6">
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 transition-transform group-hover:scale-110 duration-300">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-lg text-gold-400">{dict.footer.businessName}</span>
            </Link>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{dict.footer.businessAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold-400 flex-shrink-0" />
                <a href="tel:0522738783" className="hover:text-gold-400 transition-colors">052-2738783</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold-400 flex-shrink-0" />
                <a href="mailto:info@lozamountgerizim.com" className="hover:text-gold-400 transition-colors">info@lozamountgerizim.com</a>
              </div>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://wa.me/972522738783" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-green-600 flex items-center justify-center transition-all duration-300 group"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gold-400 mb-4 text-lg">{dict.footer.shop}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href={`/${locale}/collections/tahini`} className="text-gray-300 hover:text-gold-400 transition-colors inline-block">{dict.home.collections.tahini}</Link></li>
              <li><Link href={`/${locale}/collections/hummus`} className="text-gray-300 hover:text-gold-400 transition-colors inline-block">{dict.home.collections.hummus}</Link></li>
              <li><Link href={`/${locale}/collections/olive-oil`} className="text-gray-300 hover:text-gold-400 transition-colors inline-block">{dict.home.collections.oliveOil}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gold-400 mb-4 text-lg">{dict.footer.support}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href={`/${locale}#about`} className="text-gray-300 hover:text-gold-400 transition-colors inline-block">{dict.footer.about}</Link></li>
              <li><Link href={`/${locale}#contact`} className="text-gray-300 hover:text-gold-400 transition-colors inline-block">{dict.footer.contact}</Link></li>
              <li><Link href={`/${locale}#faq`} className="text-gray-300 hover:text-gold-400 transition-colors inline-block">{dict.footer.faq}</Link></li>
              <li><Link href={`/${locale}#trust-policies`} className="text-gray-300 hover:text-gold-400 transition-colors inline-block">{dict.footer.shipping}</Link></li>
              <li><Link href={`/${locale}#trust-policies`} className="text-gray-300 hover:text-gold-400 transition-colors inline-block">{dict.footer.returns}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gold-400 mb-4 text-lg">{dict.footer.legal}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href={`/${locale}/legal#terms`} className="text-gray-300 hover:text-gold-400 transition-colors inline-block">{dict.footer.terms}</Link></li>
              <li><Link href={`/${locale}/legal#privacy`} className="text-gray-300 hover:text-gold-400 transition-colors inline-block">{dict.footer.privacy}</Link></li>
              <li><Link href={`/${locale}/legal#cookies`} className="text-gray-300 hover:text-gold-400 transition-colors inline-block">{dict.footer.cookies}</Link></li>
              <li><Link href={`/${locale}/legal#accessibility`} className="text-gray-300 hover:text-gold-400 transition-colors inline-block">{dict.footer.accessibility}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-400">
              © {currentYear} {dict.footer.businessName}. {dict.footer.allRightsReserved}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                {dict.home.trust.delivery}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                {dict.home.trust.israelOnly}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                {dict.home.trust.age18}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                {dict.home.trust.secureCheckout}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
