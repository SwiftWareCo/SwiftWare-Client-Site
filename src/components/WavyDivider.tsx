'use client';

import { useTheme } from 'next-themes';

interface WavyDividerProps {
  direction?: 'down' | 'up';
  fromColor?: 'blue' | 'purple';
  toColor?: 'blue' | 'purple';
  className?: string;
}

const colorMap = {
  light: {
    blue: 'rgb(219, 234, 254)', // bg-blue-100
    purple: 'rgb(243, 232, 255)', // bg-purple-100
  },
  dark: {
    blue: 'rgb(24, 24, 27)', // bg-zinc-900
    purple: 'rgb(39, 39, 42)', // bg-zinc-800
  },
};

export function WavyDivider({
  direction = 'down',
  fromColor = 'blue',
  toColor = 'purple',
  className = ''
}: WavyDividerProps) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme as 'light' | 'dark';

  const backgroundColor = colorMap[theme][fromColor];
  const waveColor = colorMap[theme][toColor];

  return (
    <div
      className={`relative h-12 sm:h-16 md:h-24 overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {direction === 'down' ? (
          <path
            d="M0,40 Q300,-10 600,40 T1200,40 L1200,120 L0,120 Z"
            fill={waveColor}
          />
        ) : (
          <path
            d="M0,80 Q300,130 600,80 T1200,80 L1200,0 L0,0 Z"
            fill={waveColor}
          />
        )}
      </svg>
    </div>
  );
}
