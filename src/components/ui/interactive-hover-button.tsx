'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getColorsFromPath, getColorsRGBFromPath } from '@/lib/colors';

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = 'Button', className, ...props }, ref) => {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const colorsRGB = getColorsRGBFromPath(pathname);

  return (
    <button
      ref={ref}
      className={cn(
        'group hover:-translate-y-0.5 relative cursor-pointer flex w-full whitespace-nowrap items-center justify-center overflow-hidden rounded-2xl border border-border bg-background px-8 py-2 text-center font-semibold text-foreground transition-all duration-300',
        className
      )}
      style={{
        boxShadow: `0 14px 40px rgba(${colorsRGB.primaryRGB}, 0.22)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 18px 44px rgba(${colorsRGB.primaryRGB}, 0.3)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 14px 40px rgba(${colorsRGB.primaryRGB}, 0.22)`;
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = `2px solid ${colors.primary}`;
        e.currentTarget.style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = '';
        e.currentTarget.style.outlineOffset = '';
      }}
      {...props}
    >
      <span className='inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0'>
        {text}
      </span>
      <div className='absolute top-0 z-10 flex h-full w-full translate-x-10 items-center justify-center gap-2 text-background opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'>
        <span className='whitespace-nowrap'>{text}</span>
        <ArrowRight className='h-4 w-4 flex-shrink-0' />
      </div>
      <div
        className='absolute left-[7%] top-[42%] h-2 w-2 rounded-full transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:rounded-none'
        style={{ backgroundColor: colors.primary }}
      />
    </button>
  );
});

InteractiveHoverButton.displayName = 'InteractiveHoverButton';

export { InteractiveHoverButton };
