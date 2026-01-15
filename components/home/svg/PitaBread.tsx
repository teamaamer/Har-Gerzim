interface PitaBreadProps {
  className?: string;
  oilAmount?: number; // 0 to 1
}

export function PitaBread({ className, oilAmount = 0 }: PitaBreadProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pita bread base */}
      <ellipse
        cx="100"
        cy="60"
        rx="90"
        ry="50"
        fill="#f5deb3"
        stroke="#d4a574"
        strokeWidth="2"
      />
      
      {/* Texture spots */}
      <ellipse cx="70" cy="50" rx="8" ry="6" fill="#d4a574" opacity="0.4" />
      <ellipse cx="120" cy="55" rx="6" ry="5" fill="#d4a574" opacity="0.3" />
      <ellipse cx="90" cy="70" rx="7" ry="5" fill="#d4a574" opacity="0.35" />
      <ellipse cx="130" cy="65" rx="5" ry="4" fill="#d4a574" opacity="0.3" />
      <ellipse cx="60" cy="65" rx="6" ry="5" fill="#d4a574" opacity="0.35" />
      <ellipse cx="110" cy="45" rx="7" ry="6" fill="#d4a574" opacity="0.4" />
      
      {/* Olive oil puddle on top */}
      {oilAmount > 0 && (
        <>
          <ellipse
            cx="100"
            cy="60"
            rx={60 * oilAmount}
            ry={35 * oilAmount}
            fill="#d4a054"
            opacity="0.6"
          />
          <ellipse
            cx="95"
            cy="58"
            rx={40 * oilAmount}
            ry={20 * oilAmount}
            fill="#eab308"
            opacity="0.4"
          />
          {/* Oil shine */}
          <ellipse
            cx="90"
            cy="55"
            rx={15 * oilAmount}
            ry={8 * oilAmount}
            fill="white"
            opacity="0.5"
          />
        </>
      )}
      
      {/* Pita edge highlight */}
      <path
        d="M20 50 Q50 35 100 30 Q150 35 180 50"
        fill="none"
        stroke="white"
        strokeWidth="2"
        opacity="0.4"
      />
    </svg>
  );
}
