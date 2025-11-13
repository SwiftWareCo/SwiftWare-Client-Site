import { ReactNode, CSSProperties } from 'react';

interface SpikeDividerProps {
  children: ReactNode;
  top?: boolean;
  bottom?: boolean;
  spikeColor?: string;
  className?: string;
  paddingClassName?: string;
}

export function SpikeDivider({
  children,
  top = false,
  bottom = false,
  spikeColor = 'var(--secondary)',
  className = '',
  paddingClassName = 'py-16 sm:py-24',
}: SpikeDividerProps) {
  const spikeWidth = '50px';
  const spikeHeight = '12px';

  // Mask image styles for spike pattern
  const maskStyles: CSSProperties = {
    maskImage: 'url(/triangle.svg)',
    WebkitMaskImage: 'url(/triangle.svg)',
    maskSize: `${spikeWidth} ${spikeHeight}`,
    WebkitMaskSize: `${spikeWidth} ${spikeHeight}`,
    maskRepeat: 'repeat-x',
    WebkitMaskRepeat: 'repeat-x',
  };

  return (
    <div
      className={`relative w-full ${paddingClassName} ${className}`}
      style={{
        isolation: 'isolate',
      }}
    >
      {/* Top Spikes (facing down) */}
      {top && (
        <div
          className={`absolute top-0 left-0 w-full h-3 z-20 pointer-events-none ${spikeColor}`}
          style={maskStyles}
        />
      )}

      {/* Bottom Spikes (facing up) */}
      {bottom && (
        <div
          className={`absolute bottom-0 left-0 w-full h-3 z-20 pointer-events-none ${spikeColor}`}
          style={{
            ...maskStyles,
            transform: 'scaleY(-1)',
          }}
        />
      )}

      {/* Content - remains unskewed */}
      {children}
    </div>
  );
}
