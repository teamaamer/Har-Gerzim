'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Locale } from '@/lib/i18n/config';
import { OliveLeaf } from './svg/OliveLeaf';
import { CorkBottle } from './svg/CorkBottle';
import { WineGlass } from './svg/WineGlass';
import { PitaBread } from './svg/PitaBread';

interface ParallaxShowcaseProps {
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

export function ParallaxShowcase({ locale, dict }: ParallaxShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll-based opacity transforms for each section
  const leavesY = useTransform(scrollYProgress, [0, 1], [0, 100]); // Falls from 0% to 100% of viewport
  
  const ourStoryOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.4, 0.5], [0, 1, 1, 0]);
  const ourStoryScale = useTransform(scrollYProgress, [0.1, 0.2, 0.4, 0.5], [0.8, 1, 1, 0.8]);
  
  const traditionOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [0, 1, 1, 0]);
  const traditionScale = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [0.8, 1, 1, 0.8]);
  
  const statsOpacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);
  const statsY = useTransform(scrollYProgress, [0.7, 0.85], [100, 0]);
  
  // Bottles slide in from sides
  const leftBottleX = useTransform(scrollYProgress, [0.7, 0.85], [-200, 0]);
  const rightBottleX = useTransform(scrollYProgress, [0.7, 0.85], [200, 0]);
  const bottlesOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  
  // Cork pops and bottles tilt for pouring
  const corkPop = useTransform(scrollYProgress, [0.85, 0.88], [0, 1]);
  const leftBottleRotate = useTransform(scrollYProgress, [0.88, 0.92], [0, -45]);
  const rightBottleRotate = useTransform(scrollYProgress, [0.88, 0.92], [0, 45]);
  
  // Liquid fills glass/pita as bottles pour
  const wineFillLevel = useTransform(scrollYProgress, [0.9, 0.98], [0, 1]);
  const oilFillLevel = useTransform(scrollYProgress, [0.9, 0.98], [0, 1]);
  
  // Pouring stream visibility
  const pouringProgress = useTransform(scrollYProgress, [0.9, 0.98], [0, 1]);
  
  // Track cork popped state
  const [corkPoppedValue, setCorkPoppedValue] = useState(0);
  const [wineFill, setWineFill] = useState(0);
  const [oilFill, setOilFill] = useState(0);
  
  useEffect(() => {
    const unsubscribe1 = corkPop.on('change', (v) => setCorkPoppedValue(v));
    const unsubscribe2 = wineFillLevel.on('change', (v) => setWineFill(v));
    const unsubscribe3 = oilFillLevel.on('change', (v) => setOilFill(v));
    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
    };
  }, [corkPop, wineFillLevel, oilFillLevel]);
  
  // Counter progress based on scroll
  const counterProgress = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const [counterValue, setCounterValue] = useState(0);
  
  useEffect(() => {
    const unsubscribe = counterProgress.on('change', (v) => setCounterValue(v));
    return () => unsubscribe();
  }, [counterProgress]);

  const yearsCount = useCounter(50, 2, counterValue);
  const customersCount = useCounter(10, 2, counterValue);
  const productsCount = useCounter(4, 1.5, counterValue);

  return (
    <div
      ref={containerRef}
      style={{
        height: '500vh',
        position: 'relative',
        width: '100%',
      }}
    >
      <motion.section
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          overflow: 'hidden',
        }}
      >
        {/* Falling Olive Leaves - Scroll-Driven */}
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => {
            // Each leaf falls from top to bottom based on scroll
            const startDelay = (i / 30); // Stagger based on index
            const leafY = useTransform(
              scrollYProgress, 
              [0, 1], 
              [-10, 110] // Start above viewport, end below viewport
            );
            const leafRotate = useTransform(
              scrollYProgress,
              [startDelay, 1],
              [0, 360 + (i % 2) * 180]
            );
            const leafX = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0, Math.sin(i) * 40, Math.sin(i) * 80]
            );

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${(i * 3.33) % 100}%`,
                  top: `${(i * 2) % 30}%`,
                  width: `${25 + (i % 4) * 15}px`,
                  height: `${25 + (i % 4) * 15}px`,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  y: leafY,
                  rotate: leafRotate,
                  x: leafX,
                }}
              >
                <OliveLeaf className="w-full h-full opacity-70" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Our Story Text - Second Section */}
        <motion.div
          style={{
            position: 'absolute',
            opacity: ourStoryOpacity,
            scale: ourStoryScale,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-navy-900 tracking-tight">
            Our Story
          </h2>
        </motion.div>

        {/* Tradition Meets Excellence - Third Section */}
        <motion.div
          style={{
            position: 'absolute',
            opacity: traditionOpacity,
            scale: traditionScale,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-navy-900 mb-6 tracking-tight">
            Our Story
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl text-gold-600 font-light italic">
            Tradition Meets Excellence
          </p>
        </motion.div>

        {/* Stats Cards with Bottles and Pouring - Fourth Section */}
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
          }}
        >
          {/* Pouring Wine Background - Left */}
          <motion.div
            style={{
              position: 'absolute',
              left: '10%',
              top: 0,
              width: '140px',
              height: '100%',
              background: 'linear-gradient(to bottom, #7f1d1d 0%, #991b1b 25%, #dc2626 50%, transparent 80%)',
              opacity: 0.2,
              scaleY: pouringProgress,
              transformOrigin: 'top',
              transform: 'skewX(-5deg)',
              filter: 'blur(8px)',
            }}
          />
          
          {/* Pouring Olive Oil Background - Right */}
          <motion.div
            style={{
              position: 'absolute',
              right: '10%',
              top: 0,
              width: '140px',
              height: '100%',
              background: 'linear-gradient(to bottom, #ca8a04 0%, #eab308 25%, #fbbf24 50%, transparent 80%)',
              opacity: 0.2,
              scaleY: pouringProgress,
              transformOrigin: 'top',
              transform: 'skewX(5deg)',
              filter: 'blur(8px)',
            }}
          />

          {/* Wine Glass - Left Side */}
          <motion.div
            style={{
              position: 'absolute',
              left: '8%',
              bottom: '5%',
              opacity: bottlesOpacity,
              width: '100px',
              height: '150px',
            }}
          >
            <WineGlass fillLevel={wineFill} className="w-full h-full" />
          </motion.div>

          {/* Wine Bottle - Pours into Glass */}
          <motion.div
            style={{
              position: 'absolute',
              left: '5%',
              bottom: '35%',
              opacity: bottlesOpacity,
              x: leftBottleX,
              rotate: leftBottleRotate,
              width: '100px',
              height: '200px',
              transformOrigin: 'bottom center',
            }}
          >
            <CorkBottle color="wine" corkPopped={corkPoppedValue > 0.5} className="w-full h-full" />
          </motion.div>

          {/* Wine Pouring Stream */}
          <motion.div
            style={{
              position: 'absolute',
              left: '10%',
              bottom: '20%',
              opacity: pouringProgress,
              width: '4px',
              height: '80px',
              background: 'linear-gradient(to bottom, #8b1538 0%, #722f37 50%, transparent 100%)',
              transformOrigin: 'top',
              scaleY: pouringProgress,
            }}
          />

          {/* Pita Bread - Right Side */}
          <motion.div
            style={{
              position: 'absolute',
              right: '5%',
              bottom: '5%',
              opacity: bottlesOpacity,
              width: '180px',
              height: '110px',
            }}
          >
            <PitaBread oilAmount={oilFill} className="w-full h-full" />
          </motion.div>

          {/* Olive Oil Bottle - Pours onto Pita */}
          <motion.div
            style={{
              position: 'absolute',
              right: '8%',
              bottom: '35%',
              opacity: bottlesOpacity,
              x: rightBottleX,
              rotate: rightBottleRotate,
              width: '100px',
              height: '200px',
              transformOrigin: 'bottom center',
            }}
          >
            <CorkBottle color="oil" corkPopped={corkPoppedValue > 0.5} className="w-full h-full" />
          </motion.div>

          {/* Olive Oil Pouring Stream */}
          <motion.div
            style={{
              position: 'absolute',
              right: '12%',
              bottom: '20%',
              opacity: pouringProgress,
              width: '4px',
              height: '80px',
              background: 'linear-gradient(to bottom, #eab308 0%, #d4a054 50%, transparent 100%)',
              transformOrigin: 'top',
              scaleY: pouringProgress,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4 relative z-10">
            {/* Years Heritage */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white border-2 border-gold-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="text-6xl md:text-7xl font-bold text-gold-600 mb-2">
                  {yearsCount}+
                </div>
                <div className="text-lg text-navy-700 font-medium">Years Heritage</div>
              </div>
            </div>

            {/* Happy Customers */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white border-2 border-gold-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="text-6xl md:text-7xl font-bold text-gold-600 mb-2">
                  {customersCount}K+
                </div>
                <div className="text-lg text-navy-700 font-medium">Happy Customers</div>
              </div>
            </div>

            {/* Premium Products */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white border-2 border-gold-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="text-6xl md:text-7xl font-bold text-gold-600 mb-2">
                  {productsCount}
                </div>
                <div className="text-lg text-navy-700 font-medium">Premium Products</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
