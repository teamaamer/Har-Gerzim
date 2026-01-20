'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, Globe, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useCart } from '@/components/cart/cart-provider';
import { useCustomer } from '@/contexts/customer-context';
import { CartDrawer } from '@/components/cart/cart-drawer';
import type { Locale } from '@/lib/i18n/config';
import type { ShopifyCollection } from '@/lib/shopify/types';
import { locales, localeNames } from '@/lib/i18n/config';
import { useState, useEffect } from 'react';
import { SmoothScrollLink } from './smooth-scroll-link';

interface HeaderProps {
  locale: Locale;
  dict: any;
  collections: ShopifyCollection[];
}

export function Header({ locale, dict, collections }: HeaderProps) {
  const { cart } = useCart();
  const { customer, isAuthenticated } = useCustomer();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  
  const totalItems = cart?.totalQuantity || 0;
  const availableLocales = locales.filter(l => l !== locale);
  
  // Get path without locale prefix
  const pathWithoutLocale = pathname?.replace(`/${locale}`, '') || '';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allProductsOption = { 
    href: `/${locale}/collections/all`, 
    label: dict.nav.allProducts || 'All Products',
    isSpecial: true 
  };

  const productCategories = collections.map(collection => ({
    href: `/${locale}/collections/${collection.handle}`,
    label: collection.title,
  }));

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home, isHash: false },
    { href: `/${locale}#about`, label: dict.nav.about, isHash: true },
    { href: `/${locale}#faq`, label: dict.footer.faq, isHash: true },
    { href: `/${locale}#contact`, label: dict.nav.contact, isHash: true },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20' 
          : 'bg-white/50 backdrop-blur-lg border-b border-white/10'
      }`}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto flex h-20 items-center justify-between relative">
        <Link href={`/${locale}`} className="flex items-center gap-3 group z-10">
          <div className="relative w-12 h-12 bg-navy-900 rounded-full p-2 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
            <div className="relative w-full h-full">
              <Image 
                src="/logo.png" 
                alt="Loza Mount Gerizim" 
                fill
                className="object-contain" 
              />
            </div>
          </div>
          <span className="hidden font-bold text-lg xl:inline-block text-navy-900 group-hover:text-gold-600 transition-colors">
            {locale === 'he' ? 'שיווק הר גריזים' : locale === 'ar' ? 'لوزا جبل جرزيم' : 'Loza Mount Gerizim'}
          </span>
        </Link>
        
        <nav className="hidden lg:flex gap-6 items-center absolute left-1/2 -translate-x-1/2 z-0">
            <Link
              href={`/${locale}`}
              onClick={(e) => {
                if (window.location.pathname === `/${locale}` || window.location.pathname === `/${locale}/`) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-sm font-medium text-navy-900 hover:text-gold-600 transition-colors relative group"
            >
              {dict.nav.home}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-600 group-hover:w-full transition-all duration-300" />
            </Link>

            <div 
              className="relative"
              onMouseEnter={() => setProductsMenuOpen(true)}
              onMouseLeave={() => setProductsMenuOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-navy-900 hover:text-gold-600 transition-colors relative group"
              >
                {dict.nav.collections || 'Products'}
                <ChevronDown className="h-3 w-3" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-600 group-hover:w-full transition-all duration-300" />
              </button>
              
              {productsMenuOpen && (
                <div 
                  className="absolute top-full left-0 pt-2 w-48 z-50"
                >
                  <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg py-2">
                    <Link
                      href={allProductsOption.href}
                      className="block px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 transition-all mx-2 mb-2 rounded-md shadow-md"
                    >
                      {allProductsOption.label}
                    </Link>
                    <div className="border-t border-gray-200 mb-1" />
                    {productCategories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-navy-900 hover:bg-gold-50 hover:text-gold-600 transition-colors"
                      >
                        {category.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <SmoothScrollLink
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-navy-900 hover:text-gold-600 transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-600 group-hover:w-full transition-all duration-300" />
              </SmoothScrollLink>
            ))}
          </nav>

        <div className="flex items-center gap-3 z-10">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-sm font-medium text-navy-900 hover:text-gold-600 transition-colors hover:bg-gold-50"
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{localeNames[locale]}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
            
            <AnimatePresence>
              {languageMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setLanguageMenuOpen(false)}
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-40 bg-white/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg py-2 z-40"
                  >
                    {availableLocales.map((loc, index) => (
                      <motion.div
                        key={loc}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                      >
                        <Link
                          href={`/${loc}${pathWithoutLocale}`}
                          className="block px-4 py-2 text-sm text-navy-900 hover:bg-gold-50 hover:text-gold-600 transition-colors"
                          onClick={() => setLanguageMenuOpen(false)}
                        >
                          {localeNames[loc]}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gold-50 hover:text-gold-600"
            asChild
          >
            <Link href={isAuthenticated ? `/${locale}/account` : `/${locale}/login`}>
              <User className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gold-50 hover:text-gold-600"
            onClick={() => setCartOpen(true)}
            aria-label={dict.nav.cart}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gold-500 text-navy-900 text-xs flex items-center justify-center font-bold shadow-lg">
                {totalItems}
              </span>
            )}
          </Button>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-gold-50 hover:text-gold-600"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={locale === 'he' ? 'left' : 'right'} className="w-[300px] bg-white">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href={`/${locale}`}
                  className="text-lg font-semibold text-navy-900 hover:text-gold-600 transition-colors py-2 border-b border-gray-200"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (window.location.pathname === `/${locale}` || window.location.pathname === `/${locale}/`) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {dict.nav.home}
                </Link>

                <div className="border-b border-gray-200">
                  <button
                    className="w-full flex items-center justify-between text-lg font-semibold text-navy-900 hover:text-gold-600 transition-colors py-2"
                    onClick={() => setProductsMenuOpen(!productsMenuOpen)}
                  >
                    {dict.nav.collections || 'Products'}
                    <ChevronDown className={`h-5 w-5 transition-transform ${productsMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {productsMenuOpen && (
                    <div className="pl-4 pb-2 flex flex-col gap-2">
                      <Link
                        href={allProductsOption.href}
                        className="text-base font-bold text-white bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 transition-all py-2 px-3 rounded-md shadow-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {allProductsOption.label}
                      </Link>
                      <div className="border-t border-gray-200 my-1" />
                      {productCategories.map((category) => (
                        <Link
                          key={category.href}
                          href={category.href}
                          className="text-base font-medium text-navy-700 hover:text-gold-600 transition-colors py-1.5"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {navLinks.slice(1).map((link) => (
                  <SmoothScrollLink
                    key={link.href}
                    href={link.href}
                    className="text-lg font-semibold text-navy-900 hover:text-gold-600 transition-colors py-2 border-b border-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </SmoothScrollLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} locale={locale} dict={dict} />
    </header>
  );
}
