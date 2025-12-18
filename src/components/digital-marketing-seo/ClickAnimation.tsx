'use client';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { getColorsRGBFromPath } from '@/lib/colors';

const pulseVariants = {
  initial: { scale: 0.6, opacity: 0 },
  // Slow breathing to keep the hero background calm yet alive.
  animate: (opacity: number) => ({
    scale: [0.6, 1.25, 0.9],
    opacity: [0, opacity, 0],
  }),
};

export const ClickAnimation = () => {
  const pathname = usePathname();
  const colorsRGB = getColorsRGBFromPath(pathname);

  const pulseAnimations = [
    {
      size: 240,
      opacity: 0.24,
      delay: 4,
      position: { top: '12%', left: '16%' },
      color: `rgba(${colorsRGB.primaryRGB}, 0.28)`,
    },
    {
      size: 180,
      opacity: 0.2,
      delay: 5.5,
      position: { bottom: '18%', right: '12%' },
      color: `rgba(${colorsRGB.secondaryRGB}, 0.22)`,
    },
    {
      size: 140,
      opacity: 0.16,
      delay: 6.5,
      position: { top: '36%', right: '22%' },
      color: `rgba(${colorsRGB.primaryRGB}, 0.18)`,
    },
    {
      size: 210,
      opacity: 0.22,
      delay: 4.5,
      position: { bottom: '8%', left: '28%' },
      color: `rgba(${colorsRGB.secondaryRGB}, 0.2)`,
    },
  ];

  return (
    <div className='pointer-events-none absolute inset-0 overflow-hidden'>
      <div
        className='absolute inset-0'
        style={{
          background: `radial-gradient(circle at top, rgba(${colorsRGB.primaryRGB}, 0.18) 0%, transparent 55%)`,
        }}
      />
      {pulseAnimations.map((animation, index) => (
        <motion.div
          key={index}
          variants={pulseVariants}
          initial='initial'
          animate='animate'
          custom={animation.opacity}
          transition={{
            duration: 7,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: animation.delay,
          }}
          className='absolute rounded-full blur-xl'
          style={{
            width: animation.size,
            height: animation.size,
            backgroundColor: animation.color,
            ...animation.position,
          }}
        />
      ))}
    </div>
  );
};
