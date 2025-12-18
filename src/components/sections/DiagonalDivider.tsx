'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { getColorsFromPath } from '@/lib/colors';

interface DiagonalDividerProps {
  children: ReactNode;
  skewAngle?: number;
  color?: string;
  className?: string;
  paddingClassName?: string;
  top?: boolean;
  bottom?: boolean;
}

export function DiagonalDivider({
  children,
  skewAngle = -5,
  color,
  className = '',
  paddingClassName = 'py-16 sm:py-24',
  top = true,
  bottom = true,
}: DiagonalDividerProps) {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const dividerColor = color || colors.primary;
  // If both top and bottom are false, render nothing
  if (!top && !bottom) {
    return <>{children}</>;
  }

  // If both are true, use original behavior (full skew)
  if (top && bottom) {
    return (
      <div
        className={`relative w-full ${paddingClassName} ${className}`}
        style={{
          isolation: 'isolate',
        }}
      >
        {/* Skewed background pseudo-element */}
        <div
          className='absolute inset-0 -z-10'
          style={{
            background:
              dividerColor.includes('gradient') || dividerColor.includes(',')
                ? dividerColor
                : `linear-gradient(90deg, ${dividerColor}, ${dividerColor})`,
            transform: `skewY(${skewAngle}deg)`,
            transformOrigin: 'right',
          }}
        />

        {/* Content - remains unskewed */}
        {children}
      </div>
    );
  }

  // Partial divider (top only or bottom only)
  return (
    <div
      className={`relative w-full ${paddingClassName} ${className}`}
      style={{
        isolation: 'isolate',
      }}
    >
      {/* Top or bottom skewed section */}
      <div
        className='absolute inset-0 -z-10 overflow-hidden'
        style={{
          background: top && !bottom ? 'transparent' : undefined,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: top && !bottom ? '200%' : '200%',
            top: top && !bottom ? '-100%' : '0',
            bottom: !top && bottom ? '-100%' : 'auto',
            left: 0,
            background:
              dividerColor.includes('gradient') || dividerColor.includes(',')
                ? dividerColor
                : `linear-gradient(90deg, ${dividerColor}, ${dividerColor})`,
            transform: `skewY(${skewAngle}deg)`,
            transformOrigin: top ? 'right top' : 'right bottom',
          }}
        />
      </div>

      {/* Content - remains unskewed */}
      {children}
    </div>
  );
}
