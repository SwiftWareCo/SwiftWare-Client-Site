'use client';

interface WavyDividerProps {
  direction?: 'down' | 'up';
  fromColor?: 'background' | 'secondary';
  toColor?: 'background' | 'secondary';
  className?: string;
}

const colorMap = {
  background: 'var(--background)',
  secondary: 'var(--secondary)',
};

export function WavyDivider({
  direction = 'down',
  fromColor = 'background',
  toColor = 'secondary',
  className = ''
}: WavyDividerProps) {
  const backgroundColor = colorMap[fromColor];
  const waveColor = colorMap[toColor];

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
