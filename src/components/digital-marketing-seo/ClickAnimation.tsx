'use client';
import { motion } from 'motion/react';

const pulseAnimations = [
  {
    size: 240,
    opacity: 0.24,
    delay: 4,
    position: { top: '12%', left: '16%' },
    color: 'rgba(var(--color-primary-service-rgb), 0.28)',
  },
  {
    size: 180,
    opacity: 0.2,
    delay: 5.5,
    position: { bottom: '18%', right: '12%' },
    color: 'rgba(var(--color-secondary-service-rgb), 0.22)',
  },
  {
    size: 140,
    opacity: 0.16,
    delay: 6.5,
    position: { top: '36%', right: '22%' },
    color: 'rgba(var(--color-primary-service-rgb), 0.18)',
  },
  {
    size: 210,
    opacity: 0.22,
    delay: 4.5,
    position: { bottom: '8%', left: '28%' },
    color: 'rgba(var(--color-secondary-service-rgb), 0.2)',
  },
];

const pulseVariants = {
  initial: { scale: 0.6, opacity: 0 },
  // Slow breathing to keep the hero background calm yet alive.
  animate: (opacity: number) => ({
    scale: [0.6, 1.25, 0.9],
    opacity: [0, opacity, 0],
  }),
};

export const ClickAnimation = () => {
  return (
    <div className='pointer-events-none absolute inset-0 overflow-hidden'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-primary-service-rgb),0.18)_0%,transparent_55%)]' />
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
