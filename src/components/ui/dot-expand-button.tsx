'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface DotExpandButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function DotExpandButton({ onClick, children = 'Hover this link', className = '' }: DotExpandButtonProps) {
  return (
    <motion.button
      whileHover={{ paddingLeft: 12, paddingRight: 16 }}
      className={`group flex h-10 items-center gap-2 rounded-full bg-muted text-foreground pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground cursor-pointer active:bg-muted/80 ${className}`}
      onClick={onClick}
    >
      <span className="rounded-full bg-primary p-1 text-sm transition-colors duration-300 group-hover:bg-primary-foreground flex items-center justify-center">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className='text-primary-foreground group-hover:text-primary w-4 h-4' />
        </motion.div>
      </span>
      <span className='group-hover:font-medium transition-all'>{children}</span>
    </motion.button>
  );
}
