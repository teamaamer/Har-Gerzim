interface CorkBottleProps {
  className?: string;
  color?: 'wine' | 'oil';
  corkPopped?: boolean;
}

export function CorkBottle({ className, color = 'wine', corkPopped = false }: CorkBottleProps) {
  const bottleColor = color === 'wine' ? '#2d1810' : '#3d5a3d';
  const liquidColor = color === 'wine' ? '#722f37' : '#d4a054';
  const labelColor = color === 'wine' ? '#8b4049' : '#e8b76b';

  return (
    <svg
      viewBox="0 0 100 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cork - moves up when popped */}
      {!corkPopped ? (
        <>
          <rect
            x="35"
            y="10"
            width="30"
            height="15"
            rx="3"
            fill="#d4a574"
            stroke="#8b6f47"
            strokeWidth="1.5"
          />
          <rect
            x="37"
            y="12"
            width="26"
            height="3"
            fill="#c49563"
          />
        </>
      ) : (
        <>
          {/* Cork popped - floating above */}
          <rect
            x="30"
            y="-15"
            width="30"
            height="15"
            rx="3"
            fill="#d4a574"
            stroke="#8b6f47"
            strokeWidth="1.5"
            transform="rotate(-15 45 -7)"
          />
          <rect
            x="32"
            y="-13"
            width="26"
            height="3"
            fill="#c49563"
            transform="rotate(-15 45 -7)"
          />
        </>
      )}
      
      {/* Bottle neck */}
      <path
        d="M40 25 L40 50 Q40 55 45 55 L55 55 Q60 55 60 50 L60 25 Z"
        fill={bottleColor}
        stroke="#1a0f08"
        strokeWidth="1.5"
      />
      
      {/* Bottle body */}
      <path
        d="M35 55 L35 170 Q35 180 45 180 L55 180 Q65 180 65 170 L65 55 Z"
        fill={bottleColor}
        stroke="#1a0f08"
        strokeWidth="2"
      />
      
      {/* Liquid inside */}
      <path
        d="M38 100 L38 168 Q38 175 45 175 L55 175 Q62 175 62 168 L62 100 Z"
        fill={liquidColor}
        opacity="0.8"
      />
      
      {/* Bottle shine/highlight */}
      <ellipse
        cx="42"
        cy="90"
        rx="4"
        ry="25"
        fill="white"
        opacity="0.3"
      />
      
      {/* Label */}
      <rect
        x="38"
        y="110"
        width="24"
        height="35"
        rx="2"
        fill={labelColor}
        opacity="0.9"
      />
      
      {/* Label details */}
      <rect
        x="41"
        y="115"
        width="18"
        height="3"
        rx="1"
        fill="white"
        opacity="0.6"
      />
      <rect
        x="41"
        y="122"
        width="14"
        height="2"
        rx="1"
        fill="white"
        opacity="0.5"
      />
      <rect
        x="41"
        y="127"
        width="16"
        height="2"
        rx="1"
        fill="white"
        opacity="0.5"
      />
      
      {/* Bottom of bottle */}
      <ellipse
        cx="50"
        cy="180"
        rx="15"
        ry="4"
        fill="#0f0805"
        opacity="0.5"
      />
    </svg>
  );
}
