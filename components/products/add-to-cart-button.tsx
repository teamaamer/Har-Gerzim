'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/cart/cart-provider';
import { ShoppingCart, Check, Plus, Minus, Zap } from 'lucide-react';
import type { ShopifyProduct, ShopifyVariant } from '@/lib/shopify/types';
import type { Locale } from '@/lib/i18n/config';

interface AddToCartButtonProps {
  product: ShopifyProduct;
  defaultVariant: ShopifyVariant;
  locale: Locale;
  dict: any;
}

export function AddToCartButton({ product, defaultVariant, locale, dict }: AddToCartButtonProps) {
  const { addToCart, isLoading } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    await addToCart(selectedVariant.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = async () => {
    await addToCart(selectedVariant.id, quantity);
    router.push(`/${locale}/cart`);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="space-y-4">
      {product.variants.edges.length > 1 && (
        <div>
          <label className="block text-sm font-medium mb-2">
            {dict.product.selectVariant}
          </label>
          <select
            className="w-full p-3 border rounded-lg"
            value={selectedVariant.id}
            onChange={(e) => {
              const variant = product.variants.edges.find(
                (edge) => edge.node.id === e.target.value
              )?.node;
              if (variant) setSelectedVariant(variant);
            }}
          >
            {product.variants.edges.map(({ node: variant }) => (
              <option key={variant.id} value={variant.id}>
                {variant.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {dict.product.quantity || 'Quantity'}
        </label>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="h-10 w-10"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 text-center border rounded-lg p-2 font-semibold"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={incrementQuantity}
            className="h-10 w-10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          size="lg"
          variant="outline"
          className="flex-1 border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200"
          onClick={handleAddToCart}
          disabled={!product.availableForSale || isLoading || !selectedVariant.availableForSale}
        >
          {added ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              {dict.product.addedToCart}
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {dict.common.addToCart}
            </>
          )}
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold hover:scale-105 hover:shadow-xl hover:shadow-gold-500/50 transition-all duration-200"
          onClick={handleBuyNow}
          disabled={!product.availableForSale || isLoading || !selectedVariant.availableForSale}
        >
          <Zap className="mr-2 h-5 w-5" />
          {dict.common.buyNow || 'Buy Now'}
        </Button>
      </div>
    </div>
  );
}
