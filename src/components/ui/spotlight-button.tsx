'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface SpotlightButtonProps {
  onClick?: () => void;
  className?: string;
}

export function SpotlightButton({ onClick, className = '' }: SpotlightButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!btnRef.current || !spanRef.current) return;

      const { width } = btnRef.current.getBoundingClientRect();
      const offset = (e as any).offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current.animate({ left }, { duration: 250, fill: 'forwards' } as any);
    };

    const handleMouseLeave = () => {
      if (!spanRef.current) return;

      spanRef.current.animate(
        { left: '50%' },
        { duration: 100, fill: 'forwards' } as any
      );
    };

    const btn = btnRef.current;
    if (!btn) return;

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      onClick={onClick}
      className={`relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white ring-1 ring-zinc-800 cursor-pointer flex items-center gap-2 ${className}`}
    >
      <span className="pointer-events-none relative z-10 mix-blend-difference flex items-center gap-2">
        <span>Start your project</span>
        <motion.span
          variants={{ rest: { x: 0 }, hover: { x: 4 } }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <ArrowRight className='size-4' />
        </motion.span>
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-white/20"
      />
    </motion.button>
  );
}
