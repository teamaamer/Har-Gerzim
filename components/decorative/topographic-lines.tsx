'use client';

import { useEffect, useState } from 'react';

interface TopographicLinesProps {
  density?: 'low' | 'medium' | 'high';
  color?: string;
  animated?: boolean;
}

export function TopographicLines({ 
  density = 'medium',
  color = '#102a43',
  animated = true 
}: TopographicLinesProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const lineCount = density === 'low' ? 5 : density === 'medium' ? 8 : 12;
  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes topo-drift {
            from { transform: translateX(0); }
            to { transform: translateX(200px); }
          }
        `
      }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06]">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            animation: shouldAnimate ? 'topo-drift 60s linear infinite' : 'none',
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="topographic"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              {Array.from({ length: lineCount }).map((_, i) => {
                const y = (i / lineCount) * 200;
                const amplitude = 20 + Math.sin(i) * 10;
                
                return (
                  <path
                    key={i}
                    d={`M 0 ${y} Q 50 ${y - amplitude * Math.sin(i)}, 100 ${y} T 200 ${y}`}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    opacity={0.4 + (i % 2) * 0.2}
                  />
                );
              })}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topographic)" />
        </svg>
      </div>
    </>
  );
}
