'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface DropdownItem {
  label: string;
  href: string;
}

interface CustomDropdownProps {
  trigger: string;
  items: DropdownItem[];
  className?: string;
}

export function CustomDropdown({ trigger, items, className = '' }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className='relative group'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <motion.button
        className={`cursor-pointer flex items-center gap-1 text-sm text-foreground/80 hover:text-foreground transition-colors ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.span
          className='inline-block'
          variants={{
            rest: { x: 0 },
            hover: { x: -2 },
          }}
          initial='rest'
          whileHover='hover'
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {trigger}
        </motion.span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className='size-4' />
        </motion.div>
      </motion.button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
            className='absolute left-0 mt-2 w-56 rounded-lg bg-background border border-border shadow-xl z-50'
            style={{
              borderColor: 'var(--header-border)',
              boxShadow: 'var(--header-shadow-default)',
            }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.15 }}
              >
                <Link
                  href={item.href}
                  className='block px-4 py-2.5 text-sm text-foreground/80 hover:bg-accent hover:text-foreground first:rounded-t-lg last:rounded-b-lg transition-colors cursor-pointer'
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
