import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import type { ShopifyCollection } from '@/lib/shopify/types';

interface FooterProps {
  locale: Locale;
  dict: any;
  collections: ShopifyCollection[];
}

export function Footer({ locale, dict, collections }: FooterProps) {
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-5 w-5 fill-white">
                  <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/>
                </svg>
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
              {collections.slice(0, 4).map((collection) => (
                <li key={collection.handle}>
                  <Link 
                    href={`/${locale}/collections/${collection.handle}`} 
                    className="text-gray-300 hover:text-gold-400 transition-colors inline-block"
                  >
                    {collection.title}
                  </Link>
                </li>
              ))}
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
