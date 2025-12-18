'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { getColorsFromPath } from '@/lib/colors';

export interface WobbleCardProps {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: WobbleCardProps) => {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
          : 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)',
        transition: 'transform 0.12s ease-out',
      }}
      className={cn(
        'relative mx-auto w-full overflow-hidden rounded-3xl text-foreground',
        'shadow-[0_20px_60px_rgba(15,23,42,0.25)]',
        containerClassName
      )}
      style={{ backgroundColor: colors.primary }}
    >
      <div
        className='relative h-full overflow-hidden sm:mx-0 sm:rounded-3xl'
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3), transparent 55%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.2), transparent 45%)',
        }}
      >
        <motion.div
          style={{
            transform: isHovering
              ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
              : 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)',
            transition: 'transform 0.12s ease-out',
          }}
          className={cn('h-full px-6 py-16 sm:px-12', className)}
        >
          <div
            className='absolute inset-0 opacity-10'
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 2px, transparent 2px, transparent 6px)',
            }}
          />
          <div className='relative z-10 space-y-6 text-left text-foreground'>
            {children}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
