interface OliveLeafProps {
  className?: string;
}

export function OliveLeaf({ className }: OliveLeafProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Leaf shape */}
      <path
        d="M50 10 Q70 30 75 50 Q70 70 50 90 Q30 70 25 50 Q30 30 50 10 Z"
        fill="#4a7c59"
        stroke="#2d5a3d"
        strokeWidth="2"
      />
      {/* Center vein */}
      <path
        d="M50 15 L50 85"
        stroke="#2d5a3d"
        strokeWidth="2"
        fill="none"
      />
      {/* Side veins */}
      <path
        d="M50 30 Q60 35 65 40 M50 45 Q60 48 65 52 M50 60 Q60 62 65 65 M50 75 Q60 76 65 78"
        stroke="#2d5a3d"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M50 30 Q40 35 35 40 M50 45 Q40 48 35 52 M50 60 Q40 62 35 65 M50 75 Q40 76 35 78"
        stroke="#2d5a3d"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      {/* Highlight */}
      <ellipse
        cx="55"
        cy="35"
        rx="8"
        ry="12"
        fill="white"
        opacity="0.3"
      />
    </svg>
  );
}
