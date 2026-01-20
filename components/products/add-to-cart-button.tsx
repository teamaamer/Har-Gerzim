'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/cart/cart-provider';
import { ShoppingCart, Check, Plus, Minus, Zap, ChevronDown } from 'lucide-react';
import { formatPrice } from '@/lib/shopify';
import type { ShopifyProduct, ShopifyVariant } from '@/lib/shopify/types';
import type { Locale } from '@/lib/i18n/config';

interface AddToCartButtonProps {
  product: ShopifyProduct;
  defaultVariant: ShopifyVariant;
  locale: Locale;
  dict: any;
  onVariantChange?: (variantId: string) => void;
}

export function AddToCartButton({ product, defaultVariant, locale, dict, onVariantChange }: AddToCartButtonProps) {
  const { addToCart, isLoading } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [quantity, setQuantity] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAddToCart = async () => {
    await addToCart(selectedVariant.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = async () => {
    await addToCart(selectedVariant.id, quantity);
    router.push(`/${locale}/cart`);
  };

  const maxQuantity = selectedVariant.quantityAvailable || 999;

  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-900 leading-tight mb-3">
          {product.title}
        </h1>
        {product.description && (
          <p className="text-gray-600 text-base leading-relaxed">{product.description}</p>
        )}
      </div>

      {/* Price and Availability Card */}
      <div className="bg-gradient-to-br from-gold-50 to-gold-100/50 border-2 border-gold-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-gold-700 font-medium uppercase tracking-wide mb-1">{dict.common.price || 'Price'}</p>
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-600 to-gold-500 bg-clip-text text-transparent">
              {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode, locale)}
            </span>
          </div>
          {!product.availableForSale || !selectedVariant.availableForSale ? (
            <div className="relative overflow-hidden rounded-full">
              <Badge className="relative z-10 bg-red-500/20 text-red-700 border-2 border-red-500 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                {dict.common.outOfStock || 'Out of Stock'}
              </Badge>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-red-400/30 to-red-500/30 animate-spin-slow blur-md" style={{ animationDuration: '3s' }} />
            </div>
          ) : selectedVariant.quantityAvailable && selectedVariant.quantityAvailable <= 5 ? (
            <div className="relative overflow-hidden rounded-full">
              <Badge className="relative z-10 bg-yellow-400/20 text-yellow-700 border-2 border-yellow-400 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                {dict.product.almostSoldOut || 'Almost Sold Out'}
              </Badge>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-yellow-300/30 to-yellow-400/30 animate-spin-slow blur-md" style={{ animationDuration: '3s' }} />
            </div>
          ) : (
            <Badge className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 text-sm font-semibold">
              ✓ {dict.common.inStock || 'In Stock'}
            </Badge>
          )}
        </div>
      </div>

      {/* Variant Selector and Quantity Selector Side by Side */}
      <div className={`grid gap-4 ${product.variants.edges.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {product.variants.edges.length > 1 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <label className="block text-sm font-semibold text-navy-900 mb-3 uppercase tracking-wide">
              {dict.product.selectVariant || 'Select Option'}
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-14 px-4 pr-10 border-2 border-gray-300 rounded-xl font-medium text-navy-900 bg-white hover:border-gold-500 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-all text-left flex items-center justify-between"
              >
                <span>{selectedVariant.title}</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-xl z-20 overflow-hidden">
                    {product.variants.edges.map(({ node: variant }) => (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => {
                          setSelectedVariant(variant);
                          onVariantChange?.(variant.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gold-50 transition-colors ${
                          selectedVariant.id === variant.id 
                            ? 'bg-gold-100 text-navy-900 font-semibold' 
                            : 'text-gray-700'
                        }`}
                      >
                        {selectedVariant.id === variant.id && (
                          <Check className="inline h-4 w-4 mr-2 text-gold-600" />
                        )}
                        {variant.title}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <label className="block text-sm font-semibold text-navy-900 mb-3 uppercase tracking-wide">
            {dict.product.quantity || 'Quantity'}
          </label>
          <div className="flex items-stretch gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="h-14 w-14 border-2 border-gray-300 hover:border-navy-900 hover:bg-navy-900 hover:text-white rounded-xl transition-all flex-shrink-0"
            >
              <Minus className="h-5 w-5" />
            </Button>
            <input
              type="number"
              min="1"
              max={maxQuantity}
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 1;
                setQuantity(Math.max(1, Math.min(maxQuantity, value)));
              }}
              className="flex-1 min-w-0 h-14 text-center border-2 border-gray-300 rounded-xl px-3 text-xl font-bold text-navy-900 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-all"
              style={{ lineHeight: '3.5rem' }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
              disabled={quantity >= maxQuantity}
              className="h-14 w-14 border-2 border-gray-300 hover:border-navy-900 hover:bg-navy-900 hover:text-white rounded-xl transition-all flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <Button
          size="lg"
          className="flex-1 h-14 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-bold text-lg hover:scale-[1.02] hover:shadow-2xl hover:shadow-gold-500/50 transition-all duration-200 rounded-xl"
          onClick={handleBuyNow}
          disabled={!product.availableForSale || isLoading || !selectedVariant.availableForSale}
        >
          <Zap className="mr-2 h-5 w-5 md:h-6 md:w-6" />
          <span className="hidden sm:inline">{dict.common.buyNow || 'Buy Now'}</span>
          <span className="sm:hidden">Buy</span>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1 h-14 border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-semibold text-lg hover:scale-[1.02] hover:shadow-lg transition-all duration-200 rounded-xl"
          onClick={handleAddToCart}
          disabled={!product.availableForSale || isLoading || !selectedVariant.availableForSale}
        >
          {added ? (
            <>
              <Check className="mr-2 h-5 w-5 md:h-6 md:w-6" />
              <span className="hidden sm:inline">{dict.product.addedToCart || 'Added!'}</span>
              <span className="sm:hidden">Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5 md:h-6 md:w-6" />
              <span className="hidden sm:inline">{dict.common.addToCart}</span>
              <span className="sm:hidden">Add</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
