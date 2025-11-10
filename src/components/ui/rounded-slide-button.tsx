'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface RoundedSlideButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  autoAnimate?: boolean;
}

export function RoundedSlideButton({
  onClick,
  children = 'Get in touch',
  className = '',
  autoAnimate = false,
}: RoundedSlideButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`
        relative flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-semibold
        uppercase text-sm tracking-wider cursor-pointer overflow-hidden group
        transition-all duration-300 ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={autoAnimate ? { scale: [1, 1.05, 1] } : isHovered ? { scale: 1.05 } : { scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background gradient - fills on default, unfills on hover */}
      <motion.div
        className='absolute inset-0 rounded-lg'
        style={{
          backgroundImage: `linear-gradient(135deg, var(--color-primary-service), var(--color-secondary-service))`,
        }}
        animate={{
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Border - appears on hover */}
      <motion.div
        className='absolute inset-0 rounded-lg border-[1.5px]'
        animate={{
          borderColor: isHovered ? 'var(--color-primary-service)' : 'transparent',
        }}
        transition={{ duration: 0.4 }}
        style={{
          borderStyle: 'solid',
        }}
      />

      {/* Content wrapper */}
      <motion.div
        className='relative z-10 flex items-center gap-2'
        animate={{
          color: isHovered ? 'var(--color-primary-service)' : 'white',
        }}
        transition={{ duration: 0.4 }}
      >
        <ArrowRight className='size-4' />
        <span>{children}</span>
      </motion.div>
    </motion.button>
  );
}
