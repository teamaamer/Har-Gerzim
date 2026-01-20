'use client';

import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/shopify';
import type { Locale } from '@/lib/i18n/config';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface CartPageContentProps {
  locale: Locale;
  dict: any;
}

export function CartPageContent({ locale, dict }: CartPageContentProps) {
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

  if (!cart || cart.lines.edges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <ShoppingBag className="h-24 w-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {dict.cart.empty || 'Your cart is empty'}
        </h2>
        <p className="text-gray-600 mb-6">
          {dict.cart.emptyDescription || 'Add some products to get started'}
        </p>
        <Link href={`/${locale}/collections/all`}>
          <Button className="bg-gold-600 hover:bg-gold-700 text-navy-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {dict.common.continueShopping || 'Continue Shopping'}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {cart.lines.edges.map(({ node: item }) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            {/* Product Image */}
            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
              {item.merchandise.product.featuredImage ? (
                <Image
                  src={item.merchandise.product.featuredImage.url}
                  alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <ShoppingBag className="h-8 w-8" />
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/${locale}/products/${item.merchandise.product.handle}`}
                className="font-semibold text-navy-900 hover:text-gold-600 transition-colors line-clamp-2"
              >
                {item.merchandise.product.title}
              </Link>
              {item.merchandise.title !== 'Default Title' && (
                <p className="text-sm text-gray-600 mt-1">{item.merchandise.title}</p>
              )}
              <p className="text-lg font-bold text-gold-600 mt-2">
                {formatPrice(
                  item.cost.totalAmount.amount,
                  item.cost.totalAmount.currencyCode,
                  locale
                )}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col items-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.id)}
                disabled={isLoading}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={isLoading || item.quantity <= 1}
                  className="h-8 w-8"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={isLoading}
                  className="h-8 w-8"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-24">
          <h2 className="text-xl font-bold text-navy-900 mb-4">
            {dict.cart.orderSummary || 'Order Summary'}
          </h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-700">
              <span>{dict.cart.subtotal || 'Subtotal'}</span>
              <span className="font-semibold">
                {formatPrice(
                  cart.cost.subtotalAmount.amount,
                  cart.cost.subtotalAmount.currencyCode,
                  locale
                )}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{dict.cart.shipping || 'Shipping'}</span>
              <span className="text-sm text-gray-500">
                {dict.cart.calculatedAtCheckout || 'Calculated at checkout'}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold text-navy-900">
              <span>{dict.cart.total || 'Total'}</span>
              <span className="text-gold-600">
                {formatPrice(
                  cart.cost.totalAmount.amount,
                  cart.cost.totalAmount.currencyCode,
                  locale
                )}
              </span>
            </div>
          </div>

          {/* Terms and Conditions */}
          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors mb-4">
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
                target="_blank"
              >
                {dict.cart.termsAndConditions || 'terms and conditions'}
              </Link>
            </span>
          </label>

          <Button
            className="w-full bg-gold-600 hover:bg-gold-700 text-navy-900 font-bold shadow-lg mb-3"
            size="lg"
            onClick={handleCheckout}
            disabled={!termsAccepted || isLoading}
          >
            {dict.common.checkout || 'Checkout'}
          </Button>

          <Link href={`/${locale}/collections/all`}>
            <Button variant="outline" className="w-full" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {dict.common.continueShopping || 'Continue Shopping'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
