'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(false);

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
    <>
      <div className="space-y-4 max-h-[80vh] flex flex-col">
        {/* Main Image with Navigation */}
        <div className="relative flex-1 min-h-0 group">
          <button
            onClick={() => setIsExpanded(true)}
            className="aspect-square max-h-[65vh] relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden border border-gray-200 shadow-lg w-full cursor-zoom-in hover:border-gold-300 transition-all"
          >
            <Image
              src={images[selectedImage].url}
              alt={images[selectedImage].altText || productTitle}
              fill
              className="object-contain p-4"
              priority
            />
            {/* Zoom indicator */}
            <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="h-5 w-5 text-navy-900" />
            </div>
          </button>
          
          {/* Navigation Buttons - Over the sides */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 hover:bg-white shadow-xl border-2 border-gray-200 hover:border-gold-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-navy-900" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 hover:bg-white shadow-xl border-2 border-gray-200 hover:border-gold-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-navy-900" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail Selector */}
        {images.length > 1 && (
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide flex-shrink-0">
            {images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => handleImageChange(idx)}
                className={cn(
                  'relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-3 transition-all duration-200',
                  selectedImage === idx 
                    ? 'border-gold-500 ring-2 ring-gold-200 scale-105 shadow-lg' 
                    : 'border-gray-200 hover:border-gold-300 hover:scale-105 hover:shadow-md'
                )}
              >
                <Image
                  src={image.url}
                  alt={image.altText || `${productTitle} ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                />
                {selectedImage === idx && (
                  <div className="absolute inset-0 bg-gold-500/10 pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Expanded Image Modal */}
      {isExpanded && (
        <div 
          className="fixed top-16 left-0 right-0 bottom-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 md:p-4 animate-in fade-in duration-300"
          onClick={() => setIsExpanded(false)}
        >
          {/* Header Bar */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-3 md:p-6 flex items-center justify-between z-20">
            <div className="text-white">
              <p className="text-xs md:text-sm text-white/60 mb-1">Product Image</p>
              <h3 className="text-sm md:text-lg font-semibold line-clamp-1">{productTitle}</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 hover:scale-110 transition-all flex-shrink-0"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
          </div>

          {/* Image Container */}
          <div 
            className="relative w-full h-full max-w-7xl max-h-[85vh] animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              <Image
                src={images[selectedImage].url}
                alt={images[selectedImage].altText || productTitle}
                fill
                className="object-contain p-4 md:p-8"
              />
            </div>
          </div>

          {/* Image Counter & Navigation */}
          {images.length > 1 && (
            <>
              <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 md:px-6 md:py-3 border border-white/20 z-20">
                <p className="text-white font-medium text-xs md:text-sm">
                  {selectedImage + 1} / {images.length}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 hover:scale-110 transition-all z-20"
              >
                <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 hover:scale-110 transition-all z-20"
              >
                <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
}
