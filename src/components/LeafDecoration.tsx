interface LeafDecorationProps {
  className?: string;
}

export default function LeafDecoration({ className = '' }: LeafDecorationProps) {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      opacity="0.4"
    >
      {/* Elegant monstera-inspired leaf */}
      <path
        d="M60 10C60 10 80 30 85 50C90 70 85 90 70 100C55 110 40 105 30 90C20 75 15 55 25 35C35 15 60 10 60 10Z"
        fill="#8B9F87"
        opacity="0.3"
      />
      <path
        d="M60 10C60 10 40 25 35 45C30 65 40 85 55 95C70 105 80 95 85 80C90 65 88 45 75 30C62 15 60 10 60 10Z"
        fill="#6B7F67"
        opacity="0.2"
      />
      {/* Leaf veins */}
      <path
        d="M60 15 L60 95"
        stroke="#556B52"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M60 30 Q 70 35 75 45"
        stroke="#556B52"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
        fill="none"
      />
      <path
        d="M60 50 Q 50 55 45 65"
        stroke="#556B52"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
        fill="none"
      />
      <path
        d="M60 70 Q 68 75 72 85"
        stroke="#556B52"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
        fill="none"
      />
    </svg>
  );
}
