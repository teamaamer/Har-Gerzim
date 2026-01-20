interface WineGlassProps {
  className?: string;
  fillLevel?: number; // 0 to 1
}

export function WineGlass({ className, fillLevel = 0 }: WineGlassProps) {
  const wineHeight = 80 * fillLevel; // Max height of wine in glass
  const wineY = 100 - wineHeight; // Y position (from bottom)

  return (
    <svg
      viewBox="0 0 100 150"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glass bowl outline */}
      <path
        d="M30 20 Q25 50 25 80 L75 80 Q75 50 70 20 Z"
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="2"
      />
      
      {/* Wine inside glass */}
      {fillLevel > 0 && (
        <path
          d={`M${27 + (fillLevel * 2)} ${wineY} Q25 ${wineY + 30} 25 80 L75 80 Q75 ${wineY + 30} ${73 - (fillLevel * 2)} ${wineY} Z`}
          fill="#8b1538"
          opacity="0.9"
        />
      )}
      
      {/* Glass shine */}
      <ellipse
        cx="35"
        cy="40"
        rx="8"
        ry="20"
        fill="white"
        opacity="0.3"
      />
      
      {/* Stem */}
      <rect
        x="47"
        y="80"
        width="6"
        height="50"
        fill="#e5e7eb"
        stroke="#d1d5db"
        strokeWidth="1"
      />
      
      {/* Base */}
      <ellipse
        cx="50"
        cy="130"
        rx="25"
        ry="8"
        fill="#e5e7eb"
        stroke="#d1d5db"
        strokeWidth="1.5"
      />
      
      {/* Base shadow */}
      <ellipse
        cx="50"
        cy="132"
        rx="23"
        ry="6"
        fill="#9ca3af"
        opacity="0.3"
      />
    </svg>
  );
}
