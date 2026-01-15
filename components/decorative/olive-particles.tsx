'use client';

import { useEffect, useState } from 'react';

interface OliveParticlesProps {
  count?: number;
  color?: string;
  animated?: boolean;
}

interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  rotation: number;
}

export function OliveParticles({ 
  count = 8,
  color = '#92400e',
  animated = true 
}: OliveParticlesProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      duration: `${20 + Math.random() * 15}s`,
      size: 20 + Math.random() * 15,
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, [count]);

  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float-up {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.08; }
            90% { opacity: 0.08; }
            100% { transform: translateY(-100vh) translateX(20px) rotate(180deg); opacity: 0; }
          }
        `
      }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bottom-0 opacity-[0.08]"
            style={{
              left: particle.left,
              animationDelay: particle.delay,
              animation: shouldAnimate 
                ? `float-up ${particle.duration} ease-in-out infinite`
                : 'none',
              filter: 'blur(0.5px)',
            }}
          >
            <svg
              width={particle.size}
              height={particle.size * 2}
              viewBox="0 0 24 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${particle.rotation}deg)` }}
            >
              <path
                d="M12 2C12 2 8 8 8 14C8 18.4 9.8 22 12 22C14.2 22 16 18.4 16 14C16 8 12 2 12 2Z"
                stroke={color}
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M12 2C12 2 14 4 18 6"
                stroke={color}
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}
