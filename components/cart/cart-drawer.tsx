'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from './cart-provider';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/shopify';
import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: Locale;
  dict: any;
}

export function CartDrawer({ open, onOpenChange, locale, dict }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, isLoading } = useCart();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleCheckout = () => {
    if (!termsAccepted) {
      alert(dict.cart.termsRequired || 'Please accept the terms and conditions to proceed');
      return;
    }
    if (cart?.checkoutUrl) {
      // Add locale parameter to checkout URL
      const url = new URL(cart.checkoutUrl);
      url.searchParams.set('locale', locale);
      window.location.href = url.toString();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={locale === 'he' ? 'left' : 'right'} className="w-full sm:max-w-lg bg-white flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-2xl font-bold text-navy-900">{dict.cart.title}</SheetTitle>
          {cart && cart.lines.edges.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {cart.totalQuantity} {dict.cart.itemsInCart || 'items'}
            </p>
          )}
        </SheetHeader>

        {!cart || cart.lines.edges.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center h-[60vh] text-center"
          >
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg font-medium"
            >
              {dict.cart.empty}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground mt-2"
            >
              {dict.cart.emptyDescription}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button className="mt-6" onClick={() => onOpenChange(false)}>
                {dict.common.continueShopping}
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto py-4 px-1">
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {cart.lines.edges.map(({ node: line }, index) => (
                    <motion.div 
                      key={line.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex gap-4 p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                    {line.merchandise.product.featuredImage && (
                      <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-white border flex-shrink-0">
                        <Image
                          src={line.merchandise.product.featuredImage.url}
                          alt={line.merchandise.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <Link
                        href={`/${locale}/products/${line.merchandise.product.handle}`}
                        className="font-semibold text-navy-900 hover:text-gold-600 transition-colors line-clamp-2"
                        onClick={() => onOpenChange(false)}
                      >
                        {line.merchandise.product.title}
                      </Link>
                      {line.merchandise.title !== 'Default Title' && (
                        <p className="text-sm text-muted-foreground">{line.merchandise.title}</p>
                      )}
                      <p className="text-base font-bold text-navy-900 mt-2">
                        {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode, locale)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(line.id, Math.max(1, line.quantity - 1))}
                          disabled={isLoading}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{line.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          disabled={isLoading}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto"
                          onClick={() => removeFromCart(line.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </AnimatePresence>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="border-t bg-white pt-6 pb-4 px-4 space-y-4 mt-auto"
            >
              <div className="flex justify-between items-center py-3 px-4 bg-muted/30 rounded-lg">
                <span className="text-lg font-semibold text-navy-900">{dict.common.subtotal}</span>
                <span className="text-xl font-bold text-navy-900">{formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode, locale)}</span>
              </div>

              <div className="flex justify-between text-base text-muted-foreground">
              </div>

              <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 h-5 w-5 rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                />
                <span className="text-sm font-medium text-navy-900">
                  {dict.cart.agreeToTerms || 'I agree to the'}{' '}
                  <Link 
                    href={`/${locale}/legal`} 
                    className="text-gold-600 hover:text-gold-700 underline"
                    onClick={() => onOpenChange(false)}
                  >
                    {dict.cart.termsAndConditions || 'terms and conditions'}
                  </Link>
                </span>
              </label>

              <Link href={`/${locale}/cart`} className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-2 border-gold-600 text-gold-600 hover:bg-gold-50 font-semibold"
                  size="lg"
                  onClick={() => onOpenChange(false)}
                >
                  {dict.common.viewCart || 'View Cart'}
                </Button>
              </Link>

              <Button
                className="w-full bg-gold-600 hover:bg-gold-700 text-navy-900 font-bold shadow-lg"
                size="lg"
                onClick={handleCheckout}
                disabled={!termsAccepted || isLoading}
              >
                {dict.common.checkout}
              </Button>
            </motion.div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
