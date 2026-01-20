'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/shopify';
import { useCart } from '@/components/cart/cart-provider';
import { ShoppingCart, Zap } from 'lucide-react';
import type { ShopifyProduct } from '@/lib/shopify/types';
import type { Locale } from '@/lib/i18n/config';

interface ProductCardProps {
  product: ShopifyProduct;
  locale: Locale;
  dict: any;
}

export function ProductCard({ product, locale, dict }: ProductCardProps) {
  const image = product.images.edges[0]?.node;
  const minPrice = product.priceRange.minVariantPrice;
  const maxPrice = product.priceRange.maxVariantPrice;
  const hasMultiplePrices = minPrice.amount !== maxPrice.amount;
  const defaultVariant = product.variants.edges[0]?.node;
  const { addToCart, isLoading } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!defaultVariant || !product.availableForSale) return;
    
    setIsAdding(true);
    await addToCart(defaultVariant.id, 1);
    setIsAdding(false);
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!defaultVariant || !product.availableForSale) return;
    
    setIsAdding(true);
    await addToCart(defaultVariant.id, 1);
    setIsAdding(false);
    router.push(`/${locale}/cart`);
  };

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link href={`/${locale}/products/${product.handle}`} className="flex-shrink-0">
        <div className="aspect-square relative bg-muted">
          {image && (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {!product.availableForSale && (
            <Badge className={`absolute top-3 ${locale === 'ar' || locale === 'he' ? 'right-3' : 'left-3'} bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-700 hover:bg-red-500/30 overflow-hidden`}>
              <span className="absolute inset-0 rounded-full bg-red-500/30 blur-md animate-spin" style={{ animationDuration: '3s' }} />
              <span className="relative">{dict.common.outOfStock}</span>
            </Badge>
          )}
          {product.availableForSale && defaultVariant && defaultVariant.quantityAvailable && Number(defaultVariant.quantityAvailable) > 0 && Number(defaultVariant.quantityAvailable) <= 5 && (
            <Badge className={`absolute top-3 ${locale === 'ar' || locale === 'he' ? 'right-3' : 'left-3'} bg-yellow-400/30 backdrop-blur-sm border border-yellow-400/40 text-yellow-800 hover:bg-yellow-400/40 overflow-hidden`}>
              <span className="absolute inset-0 rounded-full bg-yellow-400/40 blur-md animate-spin" style={{ animationDuration: '3s' }} />
              <span className="relative">{dict.product.almostSoldOut || 'Almost Sold Out'}</span>
            </Badge>
          )}
        </div>
      </Link>
      
      <div className="flex flex-col flex-grow p-4">
        <Link href={`/${locale}/products/${product.handle}`} className="flex-grow">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {product.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
        </Link>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {hasMultiplePrices ? (
                <>
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(minPrice.amount, minPrice.currencyCode, locale)} - {formatPrice(maxPrice.amount, maxPrice.currencyCode, locale)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {dict.common.multipleVariants || 'Multiple options available'}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-primary">
                  {formatPrice(minPrice.amount, minPrice.currencyCode, locale)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleAddToCart}
              disabled={!product.availableForSale || isLoading || isAdding}
              variant="outline"
              size="sm"
              className="flex-1 border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white hover:scale-105 hover:shadow-md transition-all duration-200 text-xs sm:text-sm px-2 sm:px-4"
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
              <span className="hidden sm:inline">{dict.common.addToCart}</span>
              <span className="sm:hidden">{(dict.common.addToCart || 'Add').split(' ')[0]}</span>
            </Button>
            <Button
              onClick={handleBuyNow}
              disabled={!product.availableForSale || isLoading || isAdding}
              size="sm"
              className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold hover:scale-105 hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-200 text-xs sm:text-sm px-2 sm:px-4"
            >
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
              <span className="hidden sm:inline">{dict.common.buyNow}</span>
              <span className="sm:hidden">{(dict.common.buyNow || 'Buy').split(' ')[0]}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
