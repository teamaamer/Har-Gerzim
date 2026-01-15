'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: Array<{
    url: string;
    altText: string | null;
    width: number;
    height: number;
  }>;
  productTitle: string;
  selectedImageIndex?: number;
  onImageChange?: (index: number) => void;
}

export function ProductGallery({ images, productTitle, selectedImageIndex, onImageChange }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(selectedImageIndex || 0);

  useEffect(() => {
    if (selectedImageIndex !== undefined) {
      setSelectedImage(selectedImageIndex);
    }
  }, [selectedImageIndex]);

  const handleImageChange = (index: number) => {
    setSelectedImage(index);
    onImageChange?.(index);
  };

  const goToPrevious = () => {
    const newIndex = selectedImage === 0 ? images.length - 1 : selectedImage - 1;
    handleImageChange(newIndex);
  };

  const goToNext = () => {
    const newIndex = selectedImage === images.length - 1 ? 0 : selectedImage + 1;
    handleImageChange(newIndex);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center">
        <span className="text-muted-foreground">No image available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image with Arrows */}
      <div className="aspect-square relative bg-muted rounded-2xl overflow-hidden group">
        <Image
          src={images[selectedImage].url}
          alt={images[selectedImage].altText || productTitle}
          fill
          className="object-cover"
          priority
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => handleImageChange(idx)}
              className={cn(
                'aspect-square relative bg-muted rounded-lg overflow-hidden border-2 transition-all',
                selectedImage === idx ? 'border-primary' : 'border-transparent hover:border-gray-300'
              )}
            >
              <Image
                src={image.url}
                alt={image.altText || `${productTitle} ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
