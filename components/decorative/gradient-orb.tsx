'use client';

import { useEffect, useState } from 'react';

interface GradientOrbProps {
  color?: 'gold' | 'navy' | 'olive';
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  animated?: boolean;
}

export function GradientOrb({ 
  color = 'gold',
  size = 'md',
  position = 'top-right',
  animated = true 
}: GradientOrbProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const colors = {
    gold: 'from-gold-400/20 via-gold-500/10 to-transparent',
    navy: 'from-navy-400/20 via-navy-500/10 to-transparent',
    olive: 'from-green-400/20 via-green-500/10 to-transparent',
  };

  const sizes = {
    sm: 'w-[300px] h-[300px]',
    md: 'w-[500px] h-[500px]',
    lg: 'w-[700px] h-[700px]',
  };

  const positions = {
    'top-left': '-top-32 -left-32',
    'top-right': '-top-32 -right-32',
    'bottom-left': '-bottom-32 -left-32',
    'bottom-right': '-bottom-32 -right-32',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes orb-pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
          }
        `
      }} />
      <div
        className={`absolute ${positions[position]} ${sizes[size]} rounded-full bg-gradient-radial ${colors[color]} blur-3xl pointer-events-none`}
        style={{
          animation: shouldAnimate ? 'orb-pulse 8s ease-in-out infinite' : 'none',
        }}
      />
    </>
  );
}
