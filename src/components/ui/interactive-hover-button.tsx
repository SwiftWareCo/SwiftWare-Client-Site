'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = 'Button', className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'group relative cursor-pointer flex w-full whitespace-nowrap items-center justify-center overflow-hidden rounded-full border border-border bg-background px-8 py-2 text-center font-semibold text-foreground transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-service-marketing',
        className
      )}
      {...props}
    >
      <span className='inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0'>
        {text}
      </span>
      <div className='absolute top-0 z-10 flex h-full w-full translate-x-10 items-center justify-center gap-2 text-service-marketing-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'>
        <span className='whitespace-nowrap'>{text}</span>
        <ArrowRight className='h-4 w-4 flex-shrink-0' />
      </div>
      <div className='absolute left-[7%] top-[42%] h-2 w-2 rounded-full bg-service-marketing transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:rounded-none group-hover:bg-service-marketing' />
    </button>
  );
});

InteractiveHoverButton.displayName = 'InteractiveHoverButton';

export { InteractiveHoverButton };
