import { useId } from 'react';

type Props = {
  size?: number | string;
  className?: string;
  title?: string;
};

/** Tall Southern iced-tea glass — amber tea, ice, lemon. Not a teacup. */
export function TeaGlass({ size = 28, className = '', title }: Props) {
  const uid = useId().replace(/:/g, '');
  const dim = typeof size === 'number' ? `${size}px` : size;
  const gradId = `teaAmber-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 96"
      width={dim}
      height={dim}
      className={`tea-glass ${className}`.trim()}
      role="img"
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {/* Glass outline */}
      <path
        d="M14 10h36l-4 74c-.4 6-5.2 10-10.5 10H28.5c-5.3 0-10.1-4-10.5-10L14 10z"
        fill="#fff8ee"
        stroke="#5b7fd6"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Amber tea fill */}
      <path
        d={`M17.2 28h29.6l-3.2 54.5c-.3 4.2-3.8 7-7.6 7H28c-3.8 0-7.3-2.8-7.6-7L17.2 28z`}
        fill={`url(#${gradId})`}
      />
      {/* Tea surface shine */}
      <ellipse cx="32" cy="28" rx="14.5" ry="3.2" fill="#ffd08a" opacity=".85" />
      {/* Ice cubes */}
      <g opacity=".92">
        <rect
          x="20"
          y="32"
          width="11"
          height="9"
          rx="1.5"
          fill="#e8f6ff"
          stroke="#9ec9ef"
          strokeWidth="1"
          transform="rotate(-8 25.5 36.5)"
        />
        <rect
          x="33"
          y="34"
          width="10"
          height="8"
          rx="1.5"
          fill="#f0fbff"
          stroke="#9ec9ef"
          strokeWidth="1"
          transform="rotate(12 38 38)"
        />
        <rect
          x="25"
          y="42"
          width="9"
          height="7"
          rx="1.2"
          fill="#dff0ff"
          stroke="#9ec9ef"
          strokeWidth="1"
          transform="rotate(-4 29.5 45.5)"
        />
      </g>
      {/* Lemon wedge on rim */}
      <g transform="translate(42 6) rotate(28)">
        <path
          d="M0 8 A10 10 0 0 1 16 8 L8 16 Z"
          fill="#ffe566"
          stroke="#e8b020"
          strokeWidth="1.2"
        />
        <path
          d="M3 9 Q8 14 13 9"
          fill="none"
          stroke="#f5c842"
          strokeWidth="1"
          opacity=".7"
        />
        <path
          d="M4 8.5 L8 13.5 L12 8.5"
          fill="none"
          stroke="#fff9c4"
          strokeWidth=".8"
          opacity=".8"
        />
      </g>
      {/* Condensation / glass highlight */}
      <path
        d="M20 18c0 0 1.5 22 1.2 40"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity=".45"
      />
      <defs>
        <linearGradient
          id={gradId}
          x1="32"
          y1="28"
          x2="32"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffb347" />
          <stop offset=".45" stopColor="#ff8f3d" />
          <stop offset="1" stopColor="#e86a1a" />
        </linearGradient>
      </defs>
    </svg>
  );
}
