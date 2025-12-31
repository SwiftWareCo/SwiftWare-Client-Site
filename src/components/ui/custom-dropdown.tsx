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
  pathname?: string;
  colors?: { primary: string; secondary: string };
}

export function CustomDropdown({
  trigger,
  items,
  className = '',
  pathname = '',
  colors,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Check if any dropdown item is active
  const hasActiveItem = items.some((item) => {
    if (item.href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(item.href);
  });

  return (
    <div
      className='relative group'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <motion.button
        className={`relative cursor-pointer flex items-center gap-1 text-sm transition-colors ${
          hasActiveItem ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'
        } ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.span
          className='inline-block relative'
          variants={{
            rest: { x: 0 },
            hover: { x: -2 },
          }}
          initial='rest'
          whileHover='hover'
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {trigger}
          {hasActiveItem && colors && (
            <motion.div
              className='absolute -bottom-1 left-0 right-0 h-0.5 rounded-full'
              style={{
                background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          )}
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
            {items.map((item, index) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.15 }}
                >
                  <Link
                    href={item.href}
                    className={`relative block px-4 py-2.5 text-sm first:rounded-t-lg last:rounded-b-lg transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-accent text-foreground font-medium'
                        : 'text-foreground/80 hover:bg-accent hover:text-foreground'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
