'use client';

import { useState } from 'react';
import { ProductGallery } from './product-gallery';
import { AddToCartButton } from './add-to-cart-button';
import type { ShopifyProduct, ShopifyVariant } from '@/lib/shopify/types';
import type { Locale } from '@/lib/i18n/config';

interface ProductClientWrapperProps {
  product: ShopifyProduct;
  images: Array<{
    url: string;
    altText: string | null;
    width: number;
    height: number;
  }>;
  variants: ShopifyVariant[];
  defaultVariant: ShopifyVariant;
  locale: Locale;
  dict: any;
  children?: React.ReactNode;
}

export function ProductClientWrapper({
  product,
  images,
  variants,
  defaultVariant,
  locale,
  dict,
  children,
}: ProductClientWrapperProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // When variant changes, find its image and update gallery
  const handleVariantChange = (variantId: string) => {
    const variant = variants.find(v => v.id === variantId);
    if (variant?.image) {
      const imageIndex = images.findIndex(img => img.url === variant.image?.url);
      if (imageIndex !== -1) {
        setSelectedImageIndex(imageIndex);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Product Gallery */}
      <div className="lg:sticky lg:top-24 lg:self-start max-w-xl mx-auto lg:mx-0 w-full">
        <ProductGallery
          images={images}
          productTitle={product.title}
          selectedImageIndex={selectedImageIndex}
          onImageChange={setSelectedImageIndex}
        />
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <AddToCartButton
          product={product}
          defaultVariant={defaultVariant}
          locale={locale}
          dict={dict}
          onVariantChange={handleVariantChange}
        />
        {children}
      </div>
    </div>
  );
}
