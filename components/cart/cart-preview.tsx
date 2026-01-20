'use client';

import { Button } from '@/components/ui/button';
import { useCart } from './cart-provider';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/shopify';
import type { Locale } from '@/lib/i18n/config';
import { motion, AnimatePresence } from 'framer-motion';

interface CartPreviewProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dict: any;
}

export function CartPreview({ open, onClose, locale, dict }: CartPreviewProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <div 
            className="fixed inset-0 z-[60]" 
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed sm:absolute top-20 sm:top-auto mt-0 sm:mt-2 mx-2 sm:mx-0 w-auto sm:w-96 bg-white backdrop-blur-xl border-2 border-gray-200 rounded-xl shadow-2xl z-[70] max-h-[80vh] flex flex-col ${
              locale === 'ar' || locale === 'he' 
                ? 'left-0 right-0 sm:right-auto sm:left-0' 
                : 'right-0 left-0 sm:left-auto sm:right-0'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-navy-900" />
                <h3 className="font-bold text-base sm:text-lg text-navy-900">{dict.cart.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {!cart || cart.lines.edges.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-2">{dict.cart.empty}</p>
                  <p className="text-sm text-gray-400">{dict.cart.emptyDescription}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.lines.edges.slice(0, 3).map(({ node: item }) => (
                    <div key={item.id} className="flex gap-2 sm:gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      {item.merchandise.product.featuredImage && (
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <Image
                            src={item.merchandise.product.featuredImage.url}
                            alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm text-navy-900 truncate">
                            {item.merchandise.product.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-500" />
                          </button>
                        </div>
                        {item.merchandise.title !== 'Default Title' && (
                          <p className="text-xs text-gray-500">{item.merchandise.title}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                              className="p-1 hover:bg-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3 text-navy-900" />
                            </button>
                            <span className="text-xs font-medium text-navy-900 min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-white rounded transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3 text-navy-900" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-navy-900">
                            {formatPrice(
                              (parseFloat(item.merchandise.price.amount) * item.quantity).toString(),
                              item.merchandise.price.currencyCode,
                              locale
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {cart.lines.edges.length > 3 && (
                    <p className="text-xs text-center text-gray-500 pt-2">
                      +{cart.lines.edges.length - 3} more items
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart && cart.lines.edges.length > 0 && (
              <div className="border-t border-gray-200 p-3 sm:p-4 space-y-3 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-navy-900">{dict.cart.subtotal}</span>
                  <span className="text-lg font-bold text-navy-900">
                    {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode, locale)}
                  </span>
                </div>
                <Link href={`/${locale}/cart`} onClick={onClose}>
                  <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold">
                    {dict.cart.title}
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
