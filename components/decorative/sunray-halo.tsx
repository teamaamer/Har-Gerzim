'use client';

import { useEffect, useState } from 'react';

interface SunrayHaloProps {
  size?: 'sm' | 'md' | 'lg';
  intensity?: 'subtle' | 'medium' | 'strong';
  animated?: boolean;
}

export function SunrayHalo({ 
  size = 'md', 
  intensity = 'subtle',
  animated = true 
}: SunrayHaloProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const sizeClasses = {
    sm: 'w-[400px] h-[400px]',
    md: 'w-[600px] h-[600px]',
    lg: 'w-[800px] h-[800px]',
  };

  const opacityClasses = {
    subtle: 'opacity-[0.03]',
    medium: 'opacity-[0.06]',
    strong: 'opacity-[0.1]',
  };

  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]} ${opacityClasses[intensity]}`}
        style={{
          background: `
            conic-gradient(
              from 0deg,
              transparent 0deg,
              #f59e0b 10deg,
              transparent 20deg,
              transparent 40deg,
              #f59e0b 50deg,
              transparent 60deg,
              transparent 80deg,
              #f59e0b 90deg,
              transparent 100deg,
              transparent 120deg,
              #f59e0b 130deg,
              transparent 140deg,
              transparent 160deg,
              #f59e0b 170deg,
              transparent 180deg,
              transparent 200deg,
              #f59e0b 210deg,
              transparent 220deg,
              transparent 240deg,
              #f59e0b 250deg,
              transparent 260deg,
              transparent 280deg,
              #f59e0b 290deg,
              transparent 300deg,
              transparent 320deg,
              #f59e0b 330deg,
              transparent 340deg,
              transparent 360deg
            )
          `,
          animation: shouldAnimate ? 'sunray-rotate 40s linear infinite' : 'none',
        }}
      />
      
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]}`}
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
          opacity: intensity === 'subtle' ? 0.3 : intensity === 'medium' ? 0.5 : 0.7,
        }}
      />

      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.02,
          mixBlendMode: 'overlay',
        }}
      />

      <style jsx>{`
        @keyframes sunray-rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
