'use client';

import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { openCalendlyPopup } from '@/lib/calendly';
import { getColorsFromPath } from '@/lib/colors';

interface ScheduleButtonProps {
  text?: string;
  showIcon?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function ScheduleButton({
  text = 'Schedule Consultation',
  showIcon = true,
  className = '',
  variant = 'primary',
}: ScheduleButtonProps) {
  const pathname = usePathname();
  const colors = getColorsFromPath(pathname);

  const handleClick = () => {
    openCalendlyPopup();
  };

  const baseStyles =
    'inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium transition-all cursor-pointer';
  const variantStyles =
    variant === 'primary'
      ? 'text-white'
      : 'text-white border border-zinc-700 hover:bg-zinc-800/50';

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      style={
        variant === 'primary'
          ? {
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
            }
          : undefined
      }
    >
      <span>{text}</span>
      {showIcon && <ArrowRight className='h-5 w-5' />}
    </button>
  );
}
