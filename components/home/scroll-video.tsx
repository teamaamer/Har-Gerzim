'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Locale } from '@/lib/i18n/config';

const TOTAL_FRAMES = 240;

interface ScrollVideoProps {
  locale: Locale;
  dict: any;
}

// Animated counter hook
function useCounter(end: number, duration: number = 2, scrollProgress: number) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (scrollProgress <= 0) {
      setCount(0);
      return;
    }
    
    const targetCount = Math.floor(end * Math.min(scrollProgress, 1));
    setCount(targetCount);
  }, [end, scrollProgress]);

  return count;
}

export function ScrollVideo({ locale, dict }: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Text animations
  const ourStoryOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.35, 0.45], [0, 1, 1, 0]);
  const ourStoryScale = useTransform(scrollYProgress, [0.05, 0.15, 0.35, 0.45], [0.8, 1, 1, 0.8]);
  
  const statsOpacity = useTransform(scrollYProgress, [0.4, 0.5, 1], [0, 1, 1]);
  const statsY = useTransform(scrollYProgress, [0.4, 0.55], [100, 0]);

  // Counter progress based on scroll - starts when cards are centered (around 50-55% scroll)
  const counterProgress = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const [counterValue, setCounterValue] = useState(0);
  
  useEffect(() => {
    const unsubscribe = counterProgress.on('change', (v) => setCounterValue(v));
    return () => unsubscribe();
  }, [counterProgress]);

  const yearsCount = useCounter(50, 2, counterValue);
  const customersCount = useCounter(10, 2, counterValue);
  const productsCount = useCounter(4, 1.5, counterValue);

  // Preload all images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const loadImage = (index: number) => {
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        img.src = `/scroll-frames-webp/frame-${String(index).padStart(4, '0')}.webp`;
        img.onload = () => {
          loadedImages[index - 1] = img;
          loadedCount++;
          if (loadedCount === TOTAL_FRAMES) {
            setImages(loadedImages);
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load frame ${index}`);
          resolve();
        };
      });
    };

    // Load all frames
    Promise.all(
      Array.from({ length: TOTAL_FRAMES }, (_, i) => loadImage(i + 1))
    );
  }, []);

  // Render frame based on scroll progress
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const frameIndex = Math.min(
        Math.floor(progress * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );
      
      const img = images[frameIndex];
      if (img && img.complete) {
        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the frame
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
      }
    });

    // Draw first frame initially
    if (images[0] && images[0].complete) {
      canvas.width = images[0].width;
      canvas.height = images[0].height;
      context.drawImage(images[0], 0, 0);
    }

    return () => unsubscribe();
  }, [scrollYProgress, images, imagesLoaded]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '500vh',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        }}
      >
        {!imagesLoaded && (
          <div className="text-center">
            <div className="text-2xl font-semibold text-navy-900 mb-4">
              {dict.home.scrollVideo.loading}
            </div>
            <div className="text-lg text-gray-600">
              {dict.home.scrollVideo.preparing}
            </div>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imagesLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />

        {/* Our Story Text */}
        <motion.div
          style={{
            position: 'absolute',
            opacity: ourStoryOpacity,
            scale: ourStoryScale,
            textAlign: 'center',
            width: '100%',
            pointerEvents: 'none',
          }}
          className="px-4"
        >
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gold-400 tracking-tight drop-shadow-2xl"
            style={{
              textShadow: '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3), 0 0 60px rgba(251, 191, 36, 0.2)'
            }}
          >
            {dict.home.scrollVideo.ourStory}
          </h2>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          style={{
            position: 'absolute',
            opacity: statsOpacity,
            y: statsY,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Years Heritage */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 text-center">
                <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-gold-400 drop-shadow-lg mb-2">
                  {yearsCount}+
                </div>
                <div className="text-base sm:text-lg text-black font-medium drop-shadow-md">{dict.home.scrollVideo.yearsHeritage}</div>
              </div>
            </div>

            {/* Happy Customers */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 text-center">
                <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-gold-400 drop-shadow-lg mb-2">
                  {customersCount}K+
                </div>
                <div className="text-base sm:text-lg text-black font-medium drop-shadow-md">{dict.home.scrollVideo.happyCustomers}</div>
              </div>
            </div>

            {/* Premium Products */}
            <div className="relative group sm:col-span-2 md:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 text-center">
                <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-gold-400 drop-shadow-lg mb-2">
                  {productsCount}
                </div>
                <div className="text-base sm:text-lg text-black font-medium drop-shadow-md">{dict.home.scrollVideo.premiumProducts}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
