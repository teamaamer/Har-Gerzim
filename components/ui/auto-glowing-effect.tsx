"use client";

import { memo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AutoGlowingEffectProps {
  blur?: number;
  spread?: number;
  className?: string;
  borderWidth?: number;
  speed?: number; // rotation speed in seconds
}

const AutoGlowingEffect = memo(
  ({
    blur = 0,
    spread = 30,
    className,
    borderWidth = 2,
    speed = 3,
  }: AutoGlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const element = containerRef.current;
      if (!element) return;

      let startAngle = 0;
      let animationFrameId: number;

      const animate = () => {
        startAngle = (startAngle + 1) % 360;
        element.style.setProperty("--start", String(startAngle));
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }, [speed]);

    return (
      <div
        ref={containerRef}
        style={
          {
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--repeating-conic-gradient-times": "5",
            "--gradient": `radial-gradient(circle, #f59e0b 10%, #f59e0b00 20%),
              radial-gradient(circle at 40% 40%, #fbbf24 5%, #fbbf2400 15%),
              radial-gradient(circle at 60% 60%, #d97706 10%, #d9770600 20%), 
              radial-gradient(circle at 40% 60%, #f59e0b 10%, #f59e0b00 20%),
              repeating-conic-gradient(
                from 236.84deg at 50% 50%,
                #f59e0b 0%,
                #fbbf24 calc(25% / var(--repeating-conic-gradient-times)),
                #d97706 calc(50% / var(--repeating-conic-gradient-times)), 
                #f59e0b calc(75% / var(--repeating-conic-gradient-times)),
                #fbbf24 calc(100% / var(--repeating-conic-gradient-times))
              )`,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit]",
          blur > 0 && "blur-[var(--blur)]",
          className
        )}
      >
        <div
          className={cn(
            "glow",
            "rounded-[inherit]",
            'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
            "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
            "after:[background:var(--gradient)] after:[background-attachment:fixed]",
            "after:opacity-100",
            "after:[mask-clip:padding-box,border-box]",
            "after:[mask-composite:intersect]",
            "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
          )}
        />
      </div>
    );
  }
);

AutoGlowingEffect.displayName = "AutoGlowingEffect";

export { AutoGlowingEffect };
